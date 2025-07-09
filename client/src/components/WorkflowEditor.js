import React, { useState } from 'react';
import axios from 'axios';

// Very minimal editor for workflows. Real implementation would include
// drag-and-drop and node editing.
export default function WorkflowEditor({ workflow, onClose }) {
  const [name, setName] = useState(workflow.name);

  // Save updated workflow
  const save = async () => {
    await axios.put(`/api/workflows/${workflow._id}`, { ...workflow, name });
    onClose();
  };

  return (
    <div>
      <h3>Edit Workflow</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={save}>Save</button>
      <button onClick={onClose}>Back</button>
    </div>
  );
}
