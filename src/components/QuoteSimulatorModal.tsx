import { useState } from "react";
import "./QuoteSimulatorModal.css";
import { useQuote } from "../context/Form";
import { CompanyForm } from "../types/Company";
import { calculatePrice, formatPrice, getDiscount } from "../utils";

export const QuoteSimulatorModal = ({}: {}) => {
  const { openQuote, setOpenQuote, product, handleExport } = useQuote();

  const [form, setForm] = useState<CompanyForm>({
    name: "",
    email: "",
    rut: "",
    notes: "",
    quantity: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };


  const currentPrice = calculatePrice(form.quantity!, product!);
  const discountPercent = getDiscount(form.quantity!, product!);

  const onExport = () => {
    handleExport(form);
  };

  if (!openQuote) return null;

  return (
    <div className="modal-overlay" onClick={() => setOpenQuote(!openQuote)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Simulador de Cotización</h2>
          <button
            className="close-btn"
            onClick={() => setOpenQuote(!openQuote)}
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <label>Nombre Empresa</label>
          <input name="name" value={form.name} onChange={handleChange} />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <label>RUT</label>
          <input name="rut" value={form.rut} onChange={handleChange} />

          <label>Notas</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} />

          <div className="form-row">
            <div>
              <label>Cantidad</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="summary">
            <p>
              <b>Empresa:</b> {form.name || "-"}
            </p>
            <p>
              <b>Email:</b> {form.email || "-"}
            </p>
            <p>
              <b>RUT:</b> {form.rut || "-"}
            </p>
            <p>
              <b>Producto y cantidad:</b> {product?.name}
            </p>
            <p>
              <b>Cantidad:</b>
              {form?.quantity}
            </p>
            <p>
              <b>Descuento:</b>
              {discountPercent.toFixed()}%
            </p>
            <p>
              <b>Precio Total:</b>
              {formatPrice(currentPrice)}
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary cta2 "
            onClick={() => setOpenQuote(false)}
          >
            Cancelar
          </button>
          <button className="btn btn-primary cta1" onClick={onExport}>
            Exportar
          </button>
        </div>
      </div>
    </div>
  );
};
