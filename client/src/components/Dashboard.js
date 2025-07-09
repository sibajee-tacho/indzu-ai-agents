import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WorkflowEditor from './WorkflowEditor';

// Dashboard lists workflows and allows creating a new one
export default function Dashboard({ onLogout }) {
  const [workflows, setWorkflows] = useState([]);
  const [selected, setSelected] = useState(null);

  // Fetch workflows on mount
  useEffect(() => {
    axios.get('/api/workflows').then(res => setWorkflows(res.data));
  }, []);

  if (selected) {
    return <WorkflowEditor workflow={selected} onClose={() => setSelected(null)} />;
  }

  return (
    <div>
      <button onClick={onLogout}>Logout</button>
      <h2>Your Workflows</h2>
      <ul>
        {workflows.map(w => (
          <li key={w._id}>
            {w.name}{' '}
            <button onClick={() => setSelected(w)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
