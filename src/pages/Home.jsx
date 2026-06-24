import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api.js";
import DocumentTable from "../components/DocumentTable";


const Home = () => {

    const { name } = useAuth();


    const [kolDocuments,setKolDocuments] = useState([]);
    const [kolPagination,setKolPagination] = useState(null);
    const [kolPage,setKolPage] = useState(1);
    const [kolLoading,setKolLoading] = useState(true);


    const [hybridDocuments,setHybridDocuments] = useState([]);
    const [hybridPagination,setHybridPagination] = useState(null);
    const [hybridPage,setHybridPage] = useState(1);
    const [hybridLoading,setHybridLoading] = useState(true);





    useEffect(()=>{

        const fetchDocuments = async()=>{

            try{

                setKolLoading(true);


                const response =
                    await api.get(
                        `/documents?page=${kolPage}`
                    );


                setKolDocuments(
                    response.data.documents || []
                );


                setKolPagination(
                    response.data.pagination || null
                );


            }
            catch(error){

        setKolDocuments([]);
        setKolPagination(null);

            }
            finally{

                setKolLoading(false);

            }

        };


        fetchDocuments();


    },[kolPage]);







    useEffect(()=>{


        const fetchHybridDocuments = async()=>{


            try{

                setHybridLoading(true);


                const response =
                    await api.get(
                        `/documents/hybrid?page=${hybridPage}`
                    );


                setHybridDocuments(
                    response.data.documents || []
                );


                setHybridPagination(
                    response.data.pagination || null
                );


            }
            catch(error){

            setHybridDocuments([]);
            setHybridPagination(null);

            }
            finally{

                setHybridLoading(false);

            }

        };


        fetchHybridDocuments();


    },[hybridPage]);






    const kolPrev = ()=>{

        if(kolPagination?.hasPrevPage){

            setKolPage(
                prev=>prev-1
            );

        }

    };


    const kolNext = ()=>{

        if(kolPagination?.hasNextPage){

            setKolPage(
                prev=>prev+1
            );

        }

    };



    const hybridPrev = ()=>{

        if(hybridPagination?.hasPrevPage){

            setHybridPage(
                prev=>prev-1
            );

        }

    };



    const hybridNext = ()=>{

        if(hybridPagination?.hasNextPage){

            setHybridPage(
                prev=>prev+1
            );

        }

    };






    const kolColumns = [

        {key:"date",label:"Date"},
        {key:"createdBy",label:"Created By"},


        {key:"clientName",label:"Client Name"},
        {key:"clientEmail",label:"Client Email"},
        {key:"clientAddress",label:"Client Address"},
        {key:"clientSpecialty",label:"Specialty"},
        {key:"clientRole",label:"Role"},


        {key:"programName",label:"Program Name"},
        {key:"episodeTitle",label:"Episode Title"},
        {key:"numberOfEpisodes",label:"Episodes"},


        {key:"contentCategory",label:"Content Category"},
        {key:"contentFormat",label:"Content Format"},
        {key:"recordingMonth",label:"Recording Month"},
        {key:"streamingMonth",label:"Streaming Month"},


        {key:"contractType",label:"Contract Type"},
        {key:"contractDuration",label:"Contract Duration"},
        {key:"honorarium",label:"Honorarium"},


        {
            key:"annexure",
            label:"Annexure",
            render:(doc)=>
                doc.annexure ? "YES":"NO"
        }

    ];







    const hybridColumns = [


        {key:"date",label:"Date"},
        {key:"createdBy",label:"Created By"},


        {key:"clientName",label:"Client Name"},
        {key:"clientEmail",label:"Client Email"},
        {key:"clientAddress",label:"Client Address"},
        {key:"association",label:"Association"},


        {key:"programName",label:"Program Name"},
        {key:"programDate",label:"Program Date"},


        {key:"ticketPrice",label:"Ticket Price"},
        {
            key:"onferenceShare",
            label:"Onference"
        },
        {
            key:"organiserShare",
            label:"Organiser Share"
        },


        {
            key:"contentAvailabilityDuration",
            label:"Content Availability Duration"
        },


        {key:"accessType",label:"Access Type"},
        {key:"format",label:"Format"},
        {key:"contentPlacement",label:"Content Placement"},


        {
            key:"annexure",
            label:"Annexure",
            render:(doc)=>
                doc.annexure ? "YES":"NO"
        },


        {
            key:"additionalTerms",
            label:"Additional Terms"
        }


    ];





    return (

        <div style={containerStyle}>


            <h1 style={headingStyle}>
                Namaste,{" "}
                <span>
                    {name}
                </span>
            </h1>



            <DocumentTable

                title="KOL Documents"

                documents={kolDocuments}

                loading={kolLoading}

                pagination={kolPagination}

                onPrev={kolPrev}

                onNext={kolNext}

                columns={kolColumns}

            />



            <DocumentTable

                title="Hybrid Documents"

                documents={hybridDocuments}

                loading={hybridLoading}

                pagination={hybridPagination}

                onPrev={hybridPrev}

                onNext={hybridNext}

                columns={hybridColumns}

            />


        </div>

    );

};


export default Home;



const containerStyle={

    padding:"40px max(4vw,20px)",

    background:"#F7FAFC",

    minHeight:"100vh"

};


const headingStyle={

    fontSize:"30px",

    fontWeight:"700",

    color:"#1A202C",

    marginBottom:"35px"

};