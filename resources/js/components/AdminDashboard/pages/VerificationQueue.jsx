import { useState } from 'react';
import { T } from '../../AthleteDashboard/theme';
import { Check, X, FileText, Building, User, Calendar, MapPin, Download } from 'lucide-react';

export default function VerificationQueue() {
  const [activeTab, setActiveTab] = useState('coaches');

  const pendingCoaches = [
    {
      id: 1,
      name: 'Carlos Rivera',
      email: 'carlos@example.com',
      sport: 'Basketball',
      location: 'Makati City',
      submitted: 'Jun 21, 2026',
      documents: {
        id: 'valid_id.pdf',
        license: 'coaching_license.pdf',
        nbi: 'nbi_clearance.pdf'
      }
    },
    {
      id: 2,
      name: 'Ana Martinez',
      email: 'ana@example.com',
      sport: 'Tennis',
      location: 'Quezon City',
      submitted: 'Jun 20, 2026',
      documents: {
        id: 'valid_id.pdf',
        license: 'coaching_license.pdf',
        nbi: 'nbi_clearance.pdf'
      }
    },
  ];

  const pendingFacilities = [
    {
      id: 1,
      name: 'Sports Complex PH',
      email: 'sports@example.com',
      location: 'Pasig City',
      submitted: 'Jun 20, 2026',
      documents: {
        permit: 'business_permit.pdf',
        tax: 'tax_clearance.pdf',
        insurance: 'insurance_cert.pdf'
      }
    },
    {
      id: 2,
      name: 'Makati Gym Center',
      email: 'makati@example.com',
      location: 'Makati City',
      submitted: 'Jun 19, 2026',
      documents: {
        permit: 'business_permit.pdf',
        tax: 'tax_clearance.pdf',
        insurance: 'insurance_cert.pdf'
      }
    },
  ];

  const handleApproveCoach = (coachId) => {
    console.log('Approve coach:', coachId);
    // API call to POST /admin/verification/coach/{id}/approve
  };

  const handleApproveFacility = (facilityId) => {
    console.log('Approve facility:', facilityId);
    // API call to POST /admin/verification/facility/{id}/approve
  };

  const handleReject = (id, type) => {
    console.log('Reject:', type, id);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="page-content">
      <div className="greeting">
        <div>
          <div className="g-text">Verification Queue</div>
          <div className="g-sub">Review and approve pending coach and facility verifications</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'coaches' ? 'active' : ''}`}
          onClick={() => setActiveTab('coaches')}
        >
          <User size={14} style={{marginRight: 6}} />
          Coaches ({pendingCoaches.length})
        </button>
        <button 
          className={`tab ${activeTab === 'facilities' ? 'active' : ''}`}
          onClick={() => setActiveTab('facilities')}
        >
          <Building size={14} style={{marginRight: 6}} />
          Facilities ({pendingFacilities.length})
        </button>
      </div>

      {/* Coaches List */}
      {activeTab === 'coaches' && (
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          {pendingCoaches.map(coach => (
            <div key={coach.id} className="card">
              <div className="card-body">
                <div style={{display: 'flex', gap: 16}}>
                  <div className="avatar-circle" style={{width: 56, height: 56, fontSize: 20}}>
                    {getInitials(coach.name)}
                  </div>
                  <div style={{flex: 1}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4}}>
                      <div style={{fontSize: 16, fontWeight: 600}}>{coach.name}</div>
                      <span className="badge badge-pending">Pending</span>
                    </div>
                    <div style={{fontSize: 13, color: T.muted, marginBottom: 12}}>{coach.email}</div>
                    
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16}}>
                      <div>
                        <div style={{fontSize: 11, color: T.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4}}>Sport</div>
                        <div style={{fontSize: 13, fontWeight: 500}}>{coach.sport}</div>
                      </div>
                      <div>
                        <div style={{fontSize: 11, color: T.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4}}>Location</div>
                        <div style={{fontSize: 13, fontWeight: 500}}>{coach.location}</div>
                      </div>
                      <div>
                        <div style={{fontSize: 11, color: T.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4}}>Submitted</div>
                        <div style={{fontSize: 13, fontWeight: 500}}>{coach.submitted}</div>
                      </div>
                    </div>

                    <div style={{fontSize: 11, color: T.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8}}>
                      <FileText size={12} style={{marginRight: 4, display: 'inline', verticalAlign: 'middle'}} />
                      Documents
                    </div>
                    <div style={{display: 'flex', gap: 8, marginBottom: 16}}>
                      {Object.entries(coach.documents).map(([key, filename]) => (
                        <button 
                          key={key}
                          className="btn-ghost"
                          style={{fontSize: 12, padding: '6px 12px'}}
                        >
                          <Download size={12} style={{marginRight: 4}} />
                          {filename}
                        </button>
                      ))}
                    </div>

                    <div style={{display: 'flex', gap: 8}}>
                      <button 
                        className="btn-accept"
                        onClick={() => handleApproveCoach(coach.id)}
                      >
                        <Check size={14} style={{marginRight: 6}} />
                        Approve Coach
                      </button>
                      <button 
                        className="btn-danger"
                        onClick={() => handleReject(coach.id, 'coach')}
                      >
                        <X size={14} style={{marginRight: 6}} />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Facilities List */}
      {activeTab === 'facilities' && (
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          {pendingFacilities.map(facility => (
            <div key={facility.id} className="card">
              <div className="card-body">
                <div style={{display: 'flex', gap: 16}}>
                  <div style={{width: 56, height: 56, borderRadius: 8, background: 'rgba(202,255,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Building size={24} style={{color: T.lime}} />
                  </div>
                  <div style={{flex: 1}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4}}>
                      <div style={{fontSize: 16, fontWeight: 600}}>{facility.name}</div>
                      <span className="badge badge-pending">Pending</span>
                    </div>
                    <div style={{fontSize: 13, color: T.muted, marginBottom: 12}}>{facility.email}</div>
                    
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 16}}>
                      <div>
                        <div style={{fontSize: 11, color: T.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4}}>
                          <MapPin size={12} style={{marginRight: 4, display: 'inline', verticalAlign: 'middle'}} />
                          Location
                        </div>
                        <div style={{fontSize: 13, fontWeight: 500}}>{facility.location}</div>
                      </div>
                      <div>
                        <div style={{fontSize: 11, color: T.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4}}>
                          <Calendar size={12} style={{marginRight: 4, display: 'inline', verticalAlign: 'middle'}} />
                          Submitted
                        </div>
                        <div style={{fontSize: 13, fontWeight: 500}}>{facility.submitted}</div>
                      </div>
                    </div>

                    <div style={{fontSize: 11, color: T.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8}}>
                      <FileText size={12} style={{marginRight: 4, display: 'inline', verticalAlign: 'middle'}} />
                      Business Documents
                    </div>
                    <div style={{display: 'flex', gap: 8, marginBottom: 16}}>
                      {Object.entries(facility.documents).map(([key, filename]) => (
                        <button 
                          key={key}
                          className="btn-ghost"
                          style={{fontSize: 12, padding: '6px 12px'}}
                        >
                          <Download size={12} style={{marginRight: 4}} />
                          {filename}
                        </button>
                      ))}
                    </div>

                    <div style={{display: 'flex', gap: 8}}>
                      <button 
                        className="btn-accept"
                        onClick={() => handleApproveFacility(facility.id)}
                      >
                        <Check size={14} style={{marginRight: 6}} />
                        Approve Facility
                      </button>
                      <button 
                        className="btn-danger"
                        onClick={() => handleReject(facility.id, 'facility')}
                      >
                        <X size={14} style={{marginRight: 6}} />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'coaches' && pendingCoaches.length === 0 && (
        <div className="card">
          <div className="card-body" style={{textAlign: 'center', padding: '40px'}}>
            <Check size={48} style={{color: T.success, marginBottom: 16}} />
            <div style={{fontSize: 16, fontWeight: 600, marginBottom: 4}}>All Caught Up!</div>
            <div style={{fontSize: 13, color: T.muted}}>No pending coach verifications</div>
          </div>
        </div>
      )}

      {activeTab === 'facilities' && pendingFacilities.length === 0 && (
        <div className="card">
          <div className="card-body" style={{textAlign: 'center', padding: '40px'}}>
            <Check size={48} style={{color: T.success, marginBottom: 16}} />
            <div style={{fontSize: 16, fontWeight: 600, marginBottom: 4}}>All Caught Up!</div>
            <div style={{fontSize: 13, color: T.muted}}>No pending facility verifications</div>
          </div>
        </div>
      )}
    </div>
  );
}
