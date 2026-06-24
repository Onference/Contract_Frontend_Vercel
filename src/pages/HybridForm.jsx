import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const HybridForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
   const [formData, setFormData] = useState({
    clientName: '',
    date: '',
    clientEmail: '',
    clientAddress: '',
    annexure: false,
    association: '',
    additionalTerms: '',
    programName: '',
    programDate: '',
    accessType: 'FREE',
    format: 'LIVE-ONLINE',
    contentPlacement: 'Association Page',
    contentAvailabilityDuration: '',
    ticketPrice: '',
    onferenceShare: '',
    organiserShare: ''
});

const accessTypes = [
    'FREE',
    'PAID'
];

const formats = [
    'LIVE-ONLINE',
    'LIVE-HYBRID',
    'RECORDED-ONLINE',
    'RECORDED-HYBRID'
];

const contentPlacements = [
    'Association Page',
    'KOL Page',
    'OnferenceTV Platform (General Distribution)'
];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prevState => {
            let updatedValue = value;

            if (type === 'checkbox') {
                updatedValue = checked;
            } else if (type === 'number') {
                updatedValue = value === '' ? '' : Number(value);
            }

            const updatedState = {
                ...prevState,
                [name]: updatedValue
            };

            return updatedState;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

         const payload = {
                ...formData
            };

            const { data } = await api.post('/hybrid/form/submit', payload);

            alert('Submit Successful');
            navigate('/');
        } catch (error) {
            alert(`Submit Failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const containerStyle = {
        maxWidth: '1000px',
        margin: '0 auto',
        fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        padding: '2rem 1rem 4rem 1rem'
    };

    const sectionBoxStyle = {
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
    };

    const sectionTitleStyle = {
        fontSize: '1.4rem',
        fontWeight: '600',
        color: '#1e293b',
        marginTop: 0,
        marginBottom: '1.5rem',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid #f1f5f9'
    };

    const gridLayoutStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem'
    };

    const columnStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
    };

    const formGroupStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem'
    };

    const labelStyle = {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#334155'
    };

    const requiredStarStyle = {
        color: '#ef4444',
        marginLeft: '2px'
    };

    const inputStyle = {
        padding: '0.65rem 0.75rem',
        borderRadius: '6px',
        border: '1px solid #cbd5e1',
        fontSize: '0.95rem',
        color: '#0f172a',
        backgroundColor: '#fff',
        outline: 'none',
        transition: 'border-color 0.2s'
    };

    const badgeContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginTop: '0.25rem'
    };

    const getBadgeStyle = (isSelected) => ({
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        fontSize: '0.87rem',
        fontWeight: '500',
        cursor: 'pointer',
        border: isSelected ? '1px solid #0078d4' : '1px solid #cbd5e1',
        backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
        color: isSelected ? '#0078d4' : '#475569',
        transition: 'all 0.15s ease-in-out',
        userSelect: 'none'
    });
    
    const submitButtonStyle = (loading) => ({
        padding: '0.75rem 2rem',
        borderRadius: '6px',
        border: 'none',
        backgroundColor: loading ? '#93c5fd' : '#0078d4',
        color: '#ffffff',
        fontWeight: '600',
        cursor: loading ? 'not-allowed' : 'pointer'
    });

    const cancelButtonStyle = {
        padding: '0.75rem 2rem',
        borderRadius: '6px',
        border: '1px solid #cbd5e1',
        backgroundColor: '#fff',
        color: '#64748b',
        fontWeight: '600',
        cursor: 'pointer'
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        marginTop: '1rem'
    };

    return (
        <div style={containerStyle}>
            <form onSubmit={handleSubmit}>
               <div style={sectionBoxStyle}>
    <h2 style={sectionTitleStyle}>Client Details</h2>

    <div style={gridLayoutStyle}>
        <div style={columnStyle}>
            <div style={formGroupStyle}>
                <label style={labelStyle}>
                    Date
                    <span style={requiredStarStyle}>*</span>
                </label>

                <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
            </div>

            <div
                style={{
                    ...formGroupStyle,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <input
                    type="checkbox"
                    id="annexure"
                    name="annexure"
                    checked={formData.annexure}
                    onChange={handleChange}
                />

                <label
                    htmlFor="annexure"
                    style={{
                        ...labelStyle,
                        marginLeft: '0.5rem'
                    }}
                >
                    Annexure Only
                </label>
            </div>

            <div style={formGroupStyle}>
                <label style={labelStyle}>
                    Association
                    <span style={requiredStarStyle}>*</span>
                </label>

                <input
                    type="text"
                    name="association"
                    value={formData.association}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
            </div>
                       <div style={formGroupStyle}>
                <label style={labelStyle}>
                    Additional Terms
                    <span style={requiredStarStyle}>*</span>
                </label>

                <textarea
                    name="additionalTerms"
                    value={formData.additionalTerms}
                    onChange={handleChange}
                    rows="4"
                    style={{
                        ...inputStyle,
                        resize: 'none'
                    }}
                />
            </div>
        </div>

        <div
            style={{
                ...columnStyle,
                borderLeft: '1px dashed #e2e8f0',
                paddingLeft: '2rem'
            }}
        >
            <div style={formGroupStyle}>
                <label style={labelStyle}>
                    Client Name
                    <span style={requiredStarStyle}>*</span>
                </label>

                <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
            </div>

            <div style={formGroupStyle}>
                <label style={labelStyle}>
                    Client Email
                    <span style={requiredStarStyle}>*</span>
                </label>

                <input
                    type="email"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
            </div>

            <div style={formGroupStyle}>
                <label style={labelStyle}>
                    Client Address
                    <span style={requiredStarStyle}>*</span>
                </label>

                <textarea
                    name="clientAddress"
                    value={formData.clientAddress}
                    onChange={handleChange}
                    rows="4"
                    style={{
                        ...inputStyle,
                        resize: 'none'
                    }}
                    required
                />
            </div>
        </div>
    </div>
               </div>

               <div style={sectionBoxStyle}>
    <h2 style={sectionTitleStyle}>Program Details</h2>

    <div style={gridLayoutStyle}>
        <div style={columnStyle}>
            <div style={formGroupStyle}>
                <label style={labelStyle}>
                    Program Name
                    <span style={requiredStarStyle}>*</span>
                </label>

                <input
                    type="text"
                    name="programName"
                    value={formData.programName}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
            </div>

            <div style={formGroupStyle}>
                <label style={labelStyle}>
                    Program Date
                    <span style={requiredStarStyle}>*</span>
                </label>

                <input
                    type="text"
                    name="programDate"
                    value={formData.programDate}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
            </div>
           <div style={formGroupStyle}>
                <label style={labelStyle}>
                    Ticket Price
                    <span style={requiredStarStyle}>*</span>
                </label>

                <input
                    type="number"
                    name="ticketPrice"
                    value={formData.ticketPrice}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
            </div>

            <div style={formGroupStyle}>
                <label style={labelStyle}>
                    Onference Share
                    <span style={requiredStarStyle}>*</span>
                </label>

                <input
                    type="number"
                    name="onferenceShare"
                    value={formData.onferenceShare}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
            </div>

            <div style={formGroupStyle}>
                <label style={labelStyle}>
                    Organiser Share
                    <span style={requiredStarStyle}>*</span>
                </label>

                <input
                    type="number"
                    name="organiserShare"
                    value={formData.organiserShare}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
            </div>
        </div>

        <div
            style={{
                ...columnStyle,
                borderLeft: '1px dashed #e2e8f0',
                paddingLeft: '2rem'
            }}
        >
            <div style={formGroupStyle}>
                <label style={labelStyle}>
                    Content Availability Duration
                    <span style={requiredStarStyle}>*</span>
                </label>

                <input
                    type="text"
                    name="contentAvailabilityDuration"
                    value={formData.contentAvailabilityDuration}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
            </div>
                        <div style={formGroupStyle}>
                <label style={labelStyle}>
                    Access Type
                    <span style={requiredStarStyle}>*</span>
                </label>

                <select
                    name="accessType"
                    value={formData.accessType}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                >
                    {accessTypes.map(item => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            <div style={formGroupStyle}>
                <label style={labelStyle}>
                    Format
                    <span style={requiredStarStyle}>*</span>
                </label>

                <select
                    name="format"
                    value={formData.format}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                >
                    {formats.map(item => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            <div style={formGroupStyle}>
                <label style={labelStyle}>
                    Content Placement
                    <span style={requiredStarStyle}>*</span>
                </label>

                <select
                    name="contentPlacement"
                    value={formData.contentPlacement}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                >
                    {contentPlacements.map(item => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    </div>
               </div>

                <div style={buttonContainerStyle}>
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        style={cancelButtonStyle}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        style={submitButtonStyle(loading)}
                    >
                        {loading ? 'Loading...' : 'SUBMIT'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HybridForm;