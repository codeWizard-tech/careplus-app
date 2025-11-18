import React, { useState, useEffect } from "react";
import "./MedicalDetails.css";

const STORAGE_KEY = "medicalDetails";

const MedicalDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    allergies: "",
    conditions: "",
    reports: [], // { name, type, url }
  });

  const [showSummary, setShowSummary] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
        setShowSummary(true);
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  // Convert single file to base64 object
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("File read error"));
      reader.onload = () =>
        resolve({ name: file.name, type: file.type, url: reader.result });
      reader.readAsDataURL(file);
    });

  // Handle adding new files (append to existing)
  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      const converted = await Promise.all(files.map((f) => fileToBase64(f)));
      setFormData((prev) => ({
        ...prev,
        reports: [...(prev.reports || []), ...converted],
      }));
      // clear file input value so same file can be re-selected if needed
      e.target.value = "";
    } catch (err) {
      console.error("Failed to read files", err);
    }
  };

  // Remove single report by index
  const handleDeleteReport = (index) => {
    setFormData((prev) => {
      const next = { ...prev, reports: [...(prev.reports || [])] };
      next.reports.splice(index, 1);
      return next;
    });
  };

  // Save to localStorage and show summary
  const saveDetails = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    setShowSummary(true);
  };

  // Generic input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Render
  return (
    <div className="md-container">
      <h2 className="md-title">Medical Details</h2>

      {/* SUMMARY */}
      {showSummary ? (
        <div className="md-summary">
          <h3 className="summary-title">Medical Details Summary</h3>

          <div className="summary-row">
            <div className="summary-label">Name</div>
            <div className="summary-value">{formData.name || "-"}</div>
          </div>

          <div className="summary-row">
            <div className="summary-label">Age</div>
            <div className="summary-value">{formData.age || "-"}</div>
          </div>

          <div className="summary-row">
            <div className="summary-label">Blood Group</div>
            <div className="summary-value">{formData.bloodGroup || "-"}</div>
          </div>

          <div className="summary-row">
            <div className="summary-label">Allergies</div>
            <div className="summary-value">{formData.allergies || "-"}</div>
          </div>

          <div className="summary-row">
            <div className="summary-label">Medical Conditions</div>
            <div className="summary-value">{formData.conditions || "-"}</div>
          </div>

          <h4 className="reports-title">Uploaded Reports</h4>

          {formData.reports && formData.reports.length > 0 ? (
            <div className="reports-list">
              {formData.reports.map((file, idx) => (
                <div className="report-row" key={idx}>
                  <div className="report-name" title={file.name}>
                    {file.name}
                  </div>

                  <div className="report-actions">
                    <a
                      className="view-btn"
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>

                    <button
                      className="delete-btn"
                      onClick={() => {
                        handleDeleteReport(idx);
                        // update storage immediately
                        const updated = {
                          ...formData,
                          reports: formData.reports.filter((_, i) => i !== idx),
                        };
                        setFormData(updated);
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                      }}
                      aria-label={`Delete ${file.name}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-reports">No reports uploaded.</p>
          )}

          <div className="summary-actions">
            <button className="edit-btn" onClick={() => setShowSummary(false)}>
              ✏️ Edit Details
            </button>

            <button
              className="primary-done"
              onClick={() => {
                /* keep summary visible - placeholder for further actions */
              }}
            >
              ✅ Done
            </button>
          </div>
        </div>
      ) : (
        /* FORM */
        <form className="md-form form-group" onSubmit={saveDetails}>
          <label className="field-label">Full Name</label>
          <input
            className="field-input"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />

          <label className="field-label">Age</label>
          <input
            className="field-input"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
          />

          <label className="field-label">Blood Group</label>
          <select
            className="field-input"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select blood group</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          <label className="field-label">Allergies</label>
          <input
            className="field-input"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            placeholder="List allergies separated by commas"
          />

          <label className="field-label">Medical Conditions</label>
          <input
            className="field-input"
            name="conditions"
            value={formData.conditions}
            onChange={handleChange}
            placeholder="E.g. Diabetes, Hypertension"
          />

          <label className="field-label">Add Reports (images / PDFs)</label>
          <input
            className="field-input file-input"
            type="file"
            multiple
            accept="image/*,application/pdf"
            onChange={handleFiles}
          />

          {formData.reports && formData.reports.length > 0 && (
            <div className="existing-block">
              <div className="existing-title">Existing reports</div>
              <div className="reports-list small">
                {formData.reports.map((f, i) => (
                  <div key={i} className="report-row small">
                    <div className="report-name small" title={f.name}>
                      {f.name}
                    </div>
                    <div className="report-actions small">
                      <a
                        className="view-btn small"
                        href={f.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                      <button
                        className="delete-btn small"
                        type="button"
                        onClick={() => {
                          // remove from state (not saved yet until Save is clicked)
                          setFormData((prev) => {
                            const next = { ...prev, reports: [...prev.reports] };
                            next.reports.splice(i, 1);
                            return next;
                          });
                        }}
                        aria-label={`Delete ${f.name}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button className="save-btn" type="submit">
            Save Details
          </button>

          {localStorage.getItem(STORAGE_KEY) && (
            <button
              className="view-summary-btn"
              type="button"
              onClick={() => {
                const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
                if (saved) {
                  setFormData(saved);
                  setShowSummary(true);
                }
              }}
            >
              📄 View Summary
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default MedicalDetails;
