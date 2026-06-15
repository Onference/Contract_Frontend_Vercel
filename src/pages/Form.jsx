import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const Form = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        clientName: '',
        date: '',
        clientEmail: '',
        annexure: false,
        contractDuration: '',
        clientAddress: '',
        contractType: 'PAID',
        clientSpecialty: 'Pediatrics',
        honorarium: '5000',
        clientRole: 'Host',
        contentFormat: ["Case Discussion"],
        programName: '',
        contentCategory: ['Exclusive Members Access'],
        episodeTitle: '',
        recordingMonth: '',
        numberOfEpisodes: '',
        streamingMonth: ''
    });

    const categories = ['Exclusive Members Access', 'Daily Pulse', 'Free'];

    const formats = [
        'Case Discussion', 
        'Panel Discussion', 
        'Talk', 
        'Reel', 
        'Q&A', 
        'Series', 
        'Case Insight'
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

            if (name === 'contractType') {
                if (value === 'FREE') {
                    updatedState.honorarium = '';
                } else if (value === 'PAID' && !prevState.honorarium) {
                    updatedState.honorarium = '5000';
                }
            }

            return updatedState;
        });
    };

    const handleCategoryToggle = (category) => {
        setFormData(prevState => {
            const currentCategories = prevState.contentCategory;
            const isSelected = currentCategories.includes(category);
            
            const updatedCategories = isSelected
                ? currentCategories.filter(item => item !== category) 
                : [...currentCategories, category]; 

            return {
                ...prevState,
                contentCategory: updatedCategories
            };
        });
    };


    const handleFormatToggle = (format) => {
        setFormData(prevState => {
            const currentFormats = prevState.contentFormat;
            const isSelected = currentFormats.includes(format);
            
            const updatedFormats = isSelected
                ? currentFormats.filter(item => item !== format) 
                : [...currentFormats, format]; 

            return {
                ...prevState,
                contentFormat: updatedFormats
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.contentFormat.length === 0) {
            alert('Content Format Required');
            return;
        }

        if (formData.contentCategory.length === 0) {
            alert('Content Category Required');
            return;
        }

        try {
            setLoading(true);

         const payload = {
                ...formData,
                contentFormat: formData.contentFormat.join(', '),
                contentCategory: formData.contentCategory.join(', ')
            };

            const { data } = await api.post('/form/submit', payload);

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
                                    placeholder="e.g., 1st January 2027"
                                    style={inputStyle}
                                    required
                                />
                            </div>

                            <div
                                style={{
                                    ...formGroupStyle,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: '0.75rem'
                                }}
                            >
                                <input
                                    type="checkbox"
                                    id="annexure"
                                    name="annexure"
                                    checked={formData.annexure}
                                    onChange={handleChange}
                                    style={{
                                        width: '18px',
                                        height: '18px',
                                        cursor: 'pointer'
                                    }}
                                />

                                <label
                                    htmlFor="annexure"
                                    style={{
                                        ...labelStyle,
                                        cursor: 'pointer',
                                        marginLeft: '0.6rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    Annexure Only
                                </label>
                            </div>

                            <div style={formGroupStyle}>
                                <label style={labelStyle}>
                                    Contract Duration
                                    <span style={requiredStarStyle}>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="contractDuration"
                                    value={formData.contractDuration}
                                    onChange={handleChange}
                                    placeholder="e.g., 12 Months"
                                    style={inputStyle}
                                    required
                                />
                            </div>

                            <div style={formGroupStyle}>
                                <label style={labelStyle}>
                                    Contract Type
                                    <span style={requiredStarStyle}>*</span>
                                </label>

                                <select
                                    name="contractType"
                                    value={formData.contractType}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    required
                                >
                                    <option value="PAID">PAID</option>
                                    <option value="FREE">FREE</option>
                                </select>
                            </div>

                            {formData.contractType !== 'FREE' && (
                                <div style={formGroupStyle}>
                                    <label style={labelStyle}>
                                        Honorarium
                                        <span style={requiredStarStyle}>*</span>
                                    </label>

                                    <select
                                        name="honorarium"
                                        value={formData.honorarium}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        required
                                    >
                                        <option value="5000">5000</option>
                                    </select>
                                </div>
                            )}
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
                                    Client Name (Salutation + Full Name)
                                    <span style={requiredStarStyle}>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="clientName"
                                    value={formData.clientName}
                                    onChange={handleChange}
                                    placeholder="e.g., Dr. John Doe"
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
                                    placeholder="username@domain.com"
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
                                    placeholder=""
                                    style={{
                                        ...inputStyle,
                                        resize: 'none'
                                    }}
                                    required
                                />
                            </div>

                            <div style={formGroupStyle}>
                                <label style={labelStyle}>
                                    Client Specialty
                                    <span style={requiredStarStyle}>*</span>
                                </label>

                                <select
                                    name="clientSpecialty"
                                    value={formData.clientSpecialty}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    required
                                >
                                    <option value="Pediatrics">Pediatrics</option>
                                    <option value="Obstetrics & Gynaecology">Obstetrics & Gynaecology</option>
                                </select>
                            </div>

                            <div style={formGroupStyle}>
                                <label style={labelStyle}>
                                    Client Role
                                    <span style={requiredStarStyle}>*</span>
                                </label>

                                <select
                                    name="clientRole"
                                    value={formData.clientRole}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    required
                                >
                                    <option value="Host">Host</option>
                                    <option value="Faculty">Faculty</option>
                                </select>
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
                                    Content Format
                                    <span style={requiredStarStyle}>*</span>
                                </label>

                                <div style={badgeContainerStyle}>
                                    {formats.map((format) => {
                                        const isSelected = formData.contentFormat.includes(format);
                                        return (
                                            <div
                                                key={format}
                                                style={getBadgeStyle(isSelected)}
                                                onClick={() => handleFormatToggle(format)}
                                            >
                                                {format} {isSelected ? '✓' : '+'}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div style={formGroupStyle}>
                                <label style={labelStyle}>
                                    Content Category
                                    <span style={requiredStarStyle}>*</span>
                                </label>

                                <div style={badgeContainerStyle}>
                                    {categories.map((category) => {
                                        const isSelected = formData.contentCategory.includes(category);
                                        return (
                                            <div
                                                key={category}
                                                style={getBadgeStyle(isSelected)}
                                                onClick={() => handleCategoryToggle(category)}
                                            >
                                                {category} {isSelected ? '✓' : '+'}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div style={formGroupStyle}>
                                <label style={labelStyle}>
                                    Recording Month 
                                    <span style={requiredStarStyle}>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="recordingMonth"
                                    value={formData.recordingMonth}
                                    onChange={handleChange}
                                    placeholder="e.g., January 2027"
                                    style={inputStyle}
                                    required
                                />
                            </div>

                            <div style={formGroupStyle}>
                                <label style={labelStyle}>
                                    Streaming Month (January 2027)
                                    <span style={requiredStarStyle}>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="streamingMonth"
                                    value={formData.streamingMonth}
                                    onChange={handleChange}
                                    placeholder="e.g., January 2027"
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
                                    Program / Series / IP Name
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
                                    Episode Title (If Applicable)
                                </label>

                                <input
                                    type="text"
                                    name="episodeTitle"
                                    value={formData.episodeTitle}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            </div>

                            <div style={formGroupStyle}>
                                <label style={labelStyle}>
                                    Number of Episodes / Sessions
                                </label>

                                <input
                                    type="number"
                                    name="numberOfEpisodes"
                                    min="0"
                                    value={formData.numberOfEpisodes}
                                    onChange={handleChange}
                                    placeholder="e.g., 5"
                                    style={inputStyle}
                                />
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

export default Form;