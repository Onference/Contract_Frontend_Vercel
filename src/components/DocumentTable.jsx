import React from "react";

const DocumentTable = ({
    title,
    documents,
    loading,
    pagination,
    onPrev,
    onNext,
    columns,
}) => {

    return (
        <div style={sectionStyle}>

            <h2 style={sectionHeadingStyle}>
                {title}
            </h2>


            {loading ? (

                <div style={statusContainerStyle}>
                    <div style={spinnerStyle}></div>
                </div>

            ) : documents.length === 0 ? (

                <div style={emptyContainerStyle}>
                    No {title}
                </div>

            ) : (

                <div style={cardStyle}>

                    <div style={tableWrapperStyle}>

                        <table style={tableStyle}>

                            <thead>

                                <tr>

                                    <th style={tableHeaderStyle}>
                                        Status
                                    </th>

                                    <th style={tableHeaderStyle}>
                                        Document
                                    </th>


                                    {columns.map((column) => (

                                        <th
                                            key={column.key}
                                            style={tableHeaderStyle}
                                        >
                                            {column.label}
                                        </th>

                                    ))}

                                </tr>

                            </thead>


                            <tbody>

                                {documents.map((doc,index)=>(

                                    <tr
                                        key={doc._id || index}
                                        style={tableRowStyle}
                                    >

                                        <td style={tableCellStyle}>

                                            <span
                                                style={
                                                    getStatusBadgeStyle(
                                                        doc.status
                                                    )
                                                }
                                            >
                                                {doc.status}
                                            </span>

                                        </td>


                                        <td style={tableCellStyle}>

                                            {
                                                doc.url ?

                                                <a
                                                    href={doc.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={buttonStyle}
                                                >
                                                    View
                                                </a>

                                                :

                                                <span
                                                    style={{
                                                        color:"#A0AEC0"
                                                    }}
                                                >
                                                    No URL
                                                </span>
                                            }

                                        </td>


                                        {columns.map((column)=>(

                                            <td
                                                key={column.key}
                                                style={tableCellStyle}
                                            >

                                                {
                                                    column.render
                                                    ?
                                                    column.render(doc)
                                                    :
                                                    doc[column.key]
                                                }

                                            </td>

                                        ))}


                                    </tr>

                                ))}

                            </tbody>

                        </table>


                    </div>



                    {pagination && (

                        <div style={paginationContainerStyle}>


                            <button
                                onClick={onPrev}
                                disabled={!pagination.hasPrevPage}
                                style={{
                                    ...navButtonStyle,
                                    ...(
                                        pagination.hasPrevPage
                                        ?
                                        {}
                                        :
                                        disabledNavButtonStyle
                                    )
                                }}
                            >
                                ← Previous
                            </button>



                            <span style={pageInfoStyle}>

                                Page{" "}
                                <b>
                                    {pagination.currentPage}
                                </b>
                                {" "}of{" "}
                                <b>
                                    {pagination.totalPages}
                                </b>

                            </span>



                            <button
                                onClick={onNext}
                                disabled={!pagination.hasNextPage}
                                style={{
                                    ...navButtonStyle,
                                    ...(
                                        pagination.hasNextPage
                                        ?
                                        {}
                                        :
                                        disabledNavButtonStyle
                                    )
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


export default DocumentTable;





const sectionStyle = {
    marginBottom:"48px"
};


const sectionHeadingStyle = {
    fontSize:"24px",
    fontWeight:"700",
    marginBottom:"18px",
    color:"#1A202C"
};


const cardStyle = {
    background:"#fff",
    borderRadius:"12px",
    border:"1px solid #E2E8F0",
    overflow:"hidden"
};


const tableWrapperStyle={
    overflowX:"auto"
};


const tableStyle={
    width:"100%",
    borderCollapse:"collapse"
};


const tableHeaderStyle={
    padding:"14px 18px",
    background:"#F8FAFC",
    fontSize:"13px",
    fontWeight:"600",
    color:"#4A5568",
    whiteSpace:"nowrap"
};


const tableRowStyle={
    borderBottom:"1px solid #EDF2F7"
};


const tableCellStyle={
    padding:"14px 18px",
    fontSize:"14px",
    color:"#4A5568",
    whiteSpace:"nowrap"
};


const buttonStyle={
    padding:"6px 14px",
    background:"#474383",
    color:"#fff",
    borderRadius:"6px",
    textDecoration:"none",
    fontSize:"13px"
};


const paginationContainerStyle={
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    padding:"16px 24px"
};


const navButtonStyle={
    padding:"8px 16px",
    border:"1px solid #E2E8F0",
    background:"#fff",
    borderRadius:"6px",
    cursor:"pointer"
};


const disabledNavButtonStyle={
    opacity:.5,
    cursor:"not-allowed"
};


const pageInfoStyle={
    color:"#718096"
};


const statusContainerStyle={
    padding:"50px",
    display:"flex",
    justifyContent:"center"
};


const spinnerStyle={
    width:"32px",
    height:"32px",
    border:"3px solid #E2E8F0",
    borderTop:"3px solid #4F46E5",
    borderRadius:"50%",
    animation:"spin 1s linear infinite"
};


const emptyContainerStyle={
    padding:"40px",
    background:"#fff",
    borderRadius:"10px",
    textAlign:"center",
    color:"#718096"
};



const getStatusBadgeStyle=(status)=>{

    const base={
        padding:"6px 10px",
        borderRadius:"6px",
        fontSize:"12px",
        fontWeight:"600"
    };


    switch(status?.toLowerCase()){

        case "signed":
            return {
                ...base,
                background:"#DEF7EC",
                color:"#03543F"
            };

        case "sent":
            return {
                ...base,
                background:"#FEF3C7",
                color:"#92400E"
            };

        default:
            return {
                ...base,
                background:"#EDF2F7",
                color:"#4A5568"
            };
    }

};