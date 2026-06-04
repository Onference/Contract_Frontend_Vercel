import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const Form = () => {
    const navigate = useNavigate();

const [formData, setFormData] = useState({
    clientName: '',
    date: '',
    clientEmail: '',
    annexure: false,
    contractDuration: '',
    clientAddress: '',
    contractType: 'PAID',
    clientSpecialty: '',
    honorarium: '',
    clientRole: '',
    contentFormat: '',
    programName: '',
    contentCategory: '',
    episodeTitle: '',
    recordingMonth: '',
    numberOfEpisodes: '',
    streamingMonth: ''
});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prevState => {
            const updatedState = {
                ...prevState,
                [name]: type === 'checkbox' ? checked : value
            };

            if (name === 'contractType' && value === 'FREE') {
                updatedState.honorarium = '';
            }

            return updatedState;
        });
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const { data } = await api.post('/form/submit', formData);

        alert('Submit Successful');
        navigate('/');
    } catch (error) {

        alert(
            `Submit Failed: ${error.message}`
        );
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

    const hintStyle = {
        fontSize: '0.8rem',
        color: '#64748b',
        marginTop: '0.25rem',
        lineHeight: '1.4'
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
                                    Annexure
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
                                   
                                    <option value="Pediatrics">
                                        Pediatrics
                                    </option>
                                    <option value="Obstetrics & Gynaecology">
                                        Obstetrics & Gynaecology
                                    </option>
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

                                <input
                                    type="text"
                                    name="contentFormat"
                                    value={formData.contentFormat}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    required
                                />

                                <div style={hintStyle}>
                                    Case Discussion, Panel Discussion, Talk,
                                    Reel, Q&A, Series, Case Insight
                                </div>
                            </div>

                            <div style={formGroupStyle}>
                                <label style={labelStyle}>
                                    Content Category
                                    <span style={requiredStarStyle}>*</span>
                                </label>

                                <select
                                    name="contentCategory"
                                    value={formData.contentCategory}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    required
                                >
                           
                                    <option value="Exclusive Members Access">
                                        Exclusive Members Access
                                    </option>
                                    <option value="Daily Pulse">
                                        Daily Pulse
                                    </option>
                                    <option value="Free">Free</option>
                                </select>
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
        type="text"
        name="numberOfEpisodes"
        value={formData.numberOfEpisodes}
        onChange={handleChange}
        placeholder=""
        style={inputStyle}
    />
</div>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '1rem',
                        marginTop: '1rem'
                    }}
                >
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        style={{
                            padding: '0.75rem 2rem',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            backgroundColor: '#fff',
                            color: '#64748b',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        style={{
                            padding: '0.75rem 2rem',
                            borderRadius: '6px',
                            border: 'none',
                            backgroundColor: '#0078d4',
                            color: '#ffffff',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow:
                                '0 2px 4px rgba(0,120,212,0.2)'
                        }}
                    >
                        SUBMIT
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;