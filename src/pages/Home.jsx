import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api.js'; 

const Home = () => {
    const { name } = useAuth();
    const [documents, setDocuments] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/documents?page=${currentPage}`);
               
                setDocuments(response.data.documents || []);
                setPagination(response.data.pagination || null);
            } catch (err) {
           
                alert(`Error Fetching Documents: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [currentPage]); 

    const handlePrevPage = () => {
        if (pagination?.hasPrevPage) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (pagination?.hasNextPage) {
            setCurrentPage(prev => prev + 1);
        }
    };

    return (
        <div style={containerStyle}>
         
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>

            <div style={headerContainerStyle}>
                <h1 style={greetingStyle}>Namaste, <span style={nameStyle}>{name}</span></h1>
            </div>

            {loading && (
                <div style={statusContainerStyle}>
                    <div style={spinnerStyle}></div>
                </div>
            )}

            {!loading && documents.length === 0 && (
                <div style={emptyContainerStyle}>
                    <p>No Documents</p>
                </div>
            )}

            {!loading && documents.length > 0 && (
                <div style={cardStyle}>
                    <div style={tableWrapperStyle}>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={tableHeaderStyle}>Status</th>
                                    <th style={tableHeaderStyle}>Document</th>
                                    <th style={tableHeaderStyle}>Date</th>
                                    <th style={tableHeaderStyle}>Annexure Only</th>
                                    <th style={tableHeaderStyle}>Client Name</th>
                                    <th style={tableHeaderStyle}>Client Email</th>
                                    <th style={tableHeaderStyle}>Client Address</th>
                                    <th style={tableHeaderStyle}>Specialty</th>
                                    <th style={tableHeaderStyle}>Role</th>
                                    <th style={tableHeaderStyle}>Duration</th>
                                    <th style={tableHeaderStyle}>Contract Type</th>
                                    <th style={tableHeaderStyle}>Honorarium</th>
                                    <th style={tableHeaderStyle}>Program/Series Name</th>
                                    <th style={tableHeaderStyle}>Episode Title</th>
                                    <th style={tableHeaderStyle}>Episodes/Sessions</th>
                                    <th style={tableHeaderStyle}>Content Format</th>
                                    <th style={tableHeaderStyle}>Content Category</th>
                                    <th style={tableHeaderStyle}>Recording Month</th>
                                    <th style={tableHeaderStyle}>Streaming Month</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((doc, index) => {
                                    return (
                                        <tr key={doc._id || index} style={tableRowStyle}>
                                            <td style={tableCellStyle}>
                                                <span style={getStatusBadgeStyle(doc.status)}>
                                                    {doc.status}
                                                </span>
                                            </td>
                                            
                                            <td style={tableCellStyle}>
                                                {doc.url ? (
                                                    <a 
                                                        href={doc.url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        style={buttonStyle}
                                                    >
                                                        View
                                                    </a>
                                                ) : (
                                                    <span style={{ color: '#a0aec0', fontSize: '13px' }}>No URL</span>
                                                )}
                                            </td>
                                            <td style={tableCellStyle}>{doc.date}</td>
                                            <td style={tableCellStyle}>{doc.annexure ? 'YES' : 'NO'}</td>
                                            <td style={tableCellStyle}>{doc.clientName}</td>
                                            <td style={tableCellStyle}>{doc.clientEmail}</td>
                                            <td style={tableCellStyle}>{doc.clientAddress}</td>
                                            <td style={tableCellStyle}>{doc.clientSpecialty}</td>
                                            <td style={tableCellStyle}>{doc.clientRole}</td>
                                            <td style={tableCellStyle}>{doc.contractDuration}</td>
                                            <td style={tableCellStyle}>{doc.contractType}</td>
                                            <td style={tableCellStyle}>{doc.honorarium}</td>
                                            <td style={tableCellStyle}>{doc.programName}</td>
                                            <td style={tableCellStyle}>{doc.episodeTitle}</td>  
                                            <td style={tableCellStyle}>{doc.numberOfEpisodes}</td>
                                            <td style={tableCellStyle}>{doc.contentFormat}</td>
                                            <td style={tableCellStyle}>{doc.contentCategory}</td>
                                            <td style={tableCellStyle}>{doc.recordingMonth}</td>
                                            <td style={tableCellStyle}>{doc.streamingMonth}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {pagination && (
                        <div style={paginationContainerStyle}>
                            <button 
                                onClick={handlePrevPage} 
                                disabled={!pagination.hasPrevPage}
                                style={{
                                    ...navButtonStyle, 
                                    ...(pagination.hasPrevPage ? {} : disabledNavButtonStyle)
                                }}
                            >
                                ← Previous
                            </button>
                            <span style={pageInfoStyle}>
                                Page <strong style={{ color: '#2d3748' }}>{pagination.currentPage}</strong> of <strong>{pagination.totalPages}</strong>
                            </span>
                            <button 
                                onClick={handleNextPage} 
                                disabled={!pagination.hasNextPage}
                                style={{
                                    ...navButtonStyle, 
                                    ...(pagination.hasNextPage ? {} : disabledNavButtonStyle)
                                }}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;

const containerStyle = { 
    padding: '40px max(4vw, 20px)', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#f7fafc',
    minHeight: '100vh',
    color: '#2d3748'
};

const headerContainerStyle = {
    marginBottom: '32px'
};

const greetingStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a202c',
    margin: '0 0 4px 0',
    letterSpacing: '-0.5px'
};

const nameStyle = {
    color: '#4f46e5' 
};

const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    border: '1px solid #e2e8f0',
    overflow: 'hidden'
};

const tableWrapperStyle = { 
    overflowX: 'auto',
    width: '100%'
};

const tableStyle = { 
    width: '100%', 
    borderCollapse: 'collapse', 
    textAlign: 'left'
};

const tableHeaderStyle = { 
    padding: '14px 18px', 
    borderBottom: '1px solid #e2e8f0', 
    fontSize: '13px', 
    fontWeight: '600',
    textTransform: 'uppercase', 
    letterSpacing: '0.5px',
    color: '#4a5568',
    backgroundColor: '#f8fafc',
    whiteSpace: 'nowrap'
};

const tableRowStyle = {
    borderBottom: '1px solid #edf2f7',
    transition: 'background-color 0.2s ease'
};

const tableCellStyle = { 
    padding: '14px 18px', 
    fontSize: '14px', 
    color: '#4a5568',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle'
};

const getStatusBadgeStyle = (status) => {
    const baseBadge = {
        padding: '6px 10px',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'uppercase',
        display: 'inline-block',
        letterSpacing: '0.5px'
    };
    
    const normalizedStatus = status?.toLowerCase().trim();

    switch (normalizedStatus) {
        case 'signed':
            return { ...baseBadge, backgroundColor: '#def7ec', color: '#03543f' }; 
        case 'sent':
            return { ...baseBadge, backgroundColor: '#fef3c7', color: '#92400e' }; 
        case 'created':
            return { ...baseBadge, backgroundColor: '#e2e8f0', color: '#4a5568' }; 
        default:
            return { ...baseBadge, backgroundColor: '#edf2f7', color: '#4a5568' }; 
    }
};

const buttonStyle = { 
    display: 'inline-block', 
    padding: '6px 14px', 
    backgroundColor: '#474383', 
    color: '#fff', 
    textDecoration: 'none', 
    borderRadius: '6px', 
    textAlign: 'center', 
    fontSize: '13px',
    fontWeight: '500',
    boxShadow: '0 1px 2px 0 rgba(79, 70, 229, 0.05)',
    transition: 'background-color 0.2s'
};

const paginationContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: '16px 24px',
    borderTop: '1px solid #edf2f7',
    backgroundColor: '#ffffff'
};

const pageInfoStyle = { 
    fontSize: '14px',
    color: '#718096'
};

const navButtonStyle = {
    padding: '8px 16px',
    backgroundColor: '#ffffff',
    color: '#4a5568',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
};

const disabledNavButtonStyle = {
    backgroundColor: '#f7fafc',
    color: '#a0aec0',
    cursor: 'not-allowed',
    border: '1px solid #edf2f7',
    boxShadow: 'none'
};

const statusContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 0'
};

const spinnerStyle = {
    width: '32px',
    height: '32px',
    border: '3px solid #e2e8f0',
    borderTop: '3px solid #4f46e5',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
};

const emptyContainerStyle = {
    padding: '40px',
    textAlign: 'center',
    color: '#718096',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #e2e8f0'
};