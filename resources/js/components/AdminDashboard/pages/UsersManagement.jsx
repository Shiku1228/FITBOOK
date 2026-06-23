import { useState } from 'react';
import { T } from '../../AthleteDashboard/theme';
import { Search, Filter, Check, X, Shield, ShieldAlert, UserCog } from 'lucide-react';

export default function UsersManagement() {
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    {id: 1, name: 'Maria Santos', email: 'maria@example.com', role: 'coach', status: 'verified', joined: 'Jun 15, 2026'},
    {id: 2, name: 'John Doe', email: 'john@example.com', role: 'athlete', status: 'active', joined: 'Jun 10, 2026'},
    {id: 3, name: 'Sports Complex PH', email: 'sports@example.com', role: 'owner', status: 'pending', joined: 'Jun 20, 2026'},
    {id: 4, name: 'Carlos Rivera', email: 'carlos@example.com', role: 'coach', status: 'pending', joined: 'Jun 21, 2026'},
    {id: 5, name: 'Anna Lee', email: 'anna@example.com', role: 'athlete', status: 'active', joined: 'Jun 5, 2026'},
    {id: 6, name: 'Makati Gym', email: 'makati@example.com', role: 'owner', status: 'verified', joined: 'May 28, 2026'},
  ];

  const filteredUsers = users.filter(user => {
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesStatus && matchesSearch;
  });

  const handleVerify = (userId) => {
    console.log('Verify user:', userId);
    // API call to PATCH /admin/users/{id}/verify
  };

  const handleDeactivate = (userId) => {
    console.log('Deactivate user:', userId);
  };

  const getStatusBadge = (status) => {
    const styles = {
      verified: 'badge-verified',
      active: 'badge-confirmed',
      pending: 'badge-pending',
      inactive: 'badge-cancelled',
    };
    return <span className={`badge ${styles[status]}`}>{status}</span>;
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="page-content">
      <div className="greeting">
        <div>
          <div className="g-text">User Management</div>
          <div className="g-sub">Manage all users, verify accounts, and control access</div>
        </div>
        <button className="btn-lime">
          <UserCog size={16} />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="search-panel">
        <div className="search-field-d">
          <div className="sfl">Search</div>
          <input 
            className="sfi" 
            placeholder="Name or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="search-field-d">
          <div className="sfl">Role</div>
          <select 
            className="sfi" 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="athlete">Athletes</option>
            <option value="coach">Coaches</option>
            <option value="owner">Facility Owners</option>
          </select>
        </div>
        <div className="search-field-d">
          <div className="sfl">Status</div>
          <select 
            className="sfi" 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button className="search-go">
          <Filter size={14} />
          Apply
        </button>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">All Users ({filteredUsers.length})</div>
        </div>
        <div className="card-body" style={{padding: 0}}>
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{borderBottom: '1px solid rgba(255,255,255,0.06)'}}>
                  <th style={{textAlign: 'left', padding: '16px 20px', fontSize: 11, fontWeight: 600, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.1em'}}>User</th>
                  <th style={{textAlign: 'left', padding: '16px 20px', fontSize: 11, fontWeight: 600, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.1em'}}>Role</th>
                  <th style={{textAlign: 'left', padding: '16px 20px', fontSize: 11, fontWeight: 600, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.1em'}}>Status</th>
                  <th style={{textAlign: 'left', padding: '16px 20px', fontSize: 11, fontWeight: 600, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.1em'}}>Joined</th>
                  <th style={{textAlign: 'right', padding: '16px 20px', fontSize: 11, fontWeight: 600, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.1em'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} style={{borderBottom: '1px solid rgba(255,255,255,0.04)'}}>
                    <td style={{padding: '14px 20px'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                        <div className="avatar-circle" style={{width: 36, height: 36, fontSize: 13}}>
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <div style={{fontSize: 13, fontWeight: 600}}>{user.name}</div>
                          <div style={{fontSize: 12, color: T.muted}}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{padding: '14px 20px'}}>
                      <span style={{fontSize: 12, fontWeight: 500, textTransform: 'capitalize'}}>{user.role}</span>
                    </td>
                    <td style={{padding: '14px 20px'}}>
                      {getStatusBadge(user.status)}
                    </td>
                    <td style={{padding: '14px 20px', fontSize: 12, color: T.muted}}>
                      {user.joined}
                    </td>
                    <td style={{padding: '14px 20px', textAlign: 'right'}}>
                      <div style={{display: 'flex', gap: 8, justifyContent: 'flex-end'}}>
                        {user.status === 'pending' && (
                          <>
                            <button 
                              className="btn-accept"
                              onClick={() => handleVerify(user.id)}
                              title="Verify"
                            >
                              <Check size={14} />
                            </button>
                            <button 
                              className="btn-danger"
                              onClick={() => handleDeactivate(user.id)}
                              title="Reject"
                            >
                              <X size={14} />
                            </button>
                          </>
                        )}
                        {(user.status === 'active' || user.status === 'verified') && (
                          <button 
                            className="btn-ghost"
                            style={{padding: '6px 12px', fontSize: 12}}
                            onClick={() => handleDeactivate(user.id)}
                          >
                            Deactivate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
