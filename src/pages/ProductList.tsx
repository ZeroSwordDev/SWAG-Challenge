import { useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import { products as allProducts } from "../data/products";
import { Product } from "../types/Product";
import { motion, AnimatePresence } from "framer-motion";
import "./ProductList.css";

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(allProducts);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // Filter and sort products based on criteria
  const filterProducts = (
    category: string,
    search: string,
    sort: string,
    supplier: string
  ) => {
    let filtered = [...allProducts];

    // Category filter
    if (category !== "all") {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(search) ||
          product.sku.toLowerCase().includes(search)
      );
    }

    // Supplier filter
    if (supplier) {
      filtered = filtered.filter((product) => product.supplier === supplier);
    }

    // Sorting logic
    switch (sort) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-asc":
        filtered.sort((a, b) => a.basePrice - b.basePrice);
        break;

      case "price-desc":
        filtered.sort((a, b) => b.basePrice - a.basePrice);
        break;
        break;
      case "stock":
        filtered.sort((a, b) => b.stock - a.stock);
        break;

      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterProducts(category, searchQuery, sortBy, selectedSupplier);
  };

  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
    filterProducts(selectedCategory, search, sortBy, selectedSupplier);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    filterProducts(selectedCategory, searchQuery, sort, selectedSupplier);
  };

  const handleSupplierChange = (supplier: string) => {
    setSelectedSupplier(supplier);
    filterProducts(
      selectedCategory,
      searchQuery,
      sortBy,
      supplier.toLowerCase()
    );
  };

  return (
    <div className="product-list-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-info">
            <h1 className="page-title h2">Catálogo de Productos</h1>
            <p className="page-subtitle p1">
              Descubre nuestra selección de productos promocionales premium
            </p>
          </div>

          <div className="page-stats">
            <div className="stat-item">
              <span className="stat-value p1-medium">
                {filteredProducts.length}
              </span>
              <span className="stat-label l1">productos</span>
            </div>
            <div className="stat-item">
              <span className="stat-value p1-medium">6</span>
              <span className="stat-label l1">categorías</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <ProductFilters
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          sortBy={sortBy}
          selectedSupplier={selectedSupplier}
          onCategoryChange={handleCategoryChange}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
          onSupplierChange={handleSupplierChange}
        />

        {/* Products Grid */}
        <div className="products-section">
          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <span className="material-icons">search_off</span>
              <h3 className="h2">No hay productos</h3>
              <p className="p1">
                No se encontraron productos que coincidan con tu búsqueda.
              </p>
              <button
                className="btn btn-primary cta1"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedSupplier("");
                  filterProducts("all", "", sortBy, selectedSupplier);
                }}
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            <div className="products-grid">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }} // entrada
                    animate={{ opacity: 1, y: 0 }} // visible
                    transition={{ duration: 0.5}}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
