'use client'
import { globalStateAtomId } from "@/atoms/atoms";
import Sidebar from "@/components/Sidebar/SideBar";
import { Page } from "@/models/institution";
import "@/styles/pagination.css";
import { Table } from "antd";
import { useAtom } from "jotai";

import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import Header, { default as Footer } from '../../components/Header/Header';
import { Availability } from "@/models/AvailabilityClassIes";
import { apiService } from "@/service/apiService/apiService";
import { useTranslation } from 'react-i18next';

export default function AvailabilityPagination() {
    const [availability, setAvailabilitys] = useState<Availability[]>([]);
    const [pageIndex, setPage] = useState(0);
    const [pageInfo, setPageInfo] = useState<Page | null>(null);
    const [searchDay, setSearchDay] = useState<string>("Monday");
    const [] = useAtom(globalStateAtomId);
    const PAGE_SIZE =25;
    const { t } = useTranslation();

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys : any) => {
        console.log("selectedRowKeys changed: ", selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    useEffect(() => {
        const getPageInfo = async () => {
            try {
                 
                const url = `http://localhost:5293/api/v1/Institution/TurmaIes/GetAllDisponibilidades?pageIndex=${pageIndex + 1}&searchDay=${searchDay}`;
                const response = await apiService.get(url);
              
                setPageInfo(response.data);
                setAvailabilitys(response.data.listAvailability)
             
                
            } catch (error) {
             
            } finally {
              
            }
        };
        getPageInfo();
    }, [pageIndex, searchDay]);

    const columTable = [
     
        {
            title: t('Dia Da Semana'),
            dataIndex: 'dayWeek',
            key: 'dayWeek',
        },
        
        {
            title: t('Tempo de inicio'),
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: t('Tempo fim'),
            dataIndex: 'scheduleEnd',
            key: 'scheduleEnd',
        },
        {
            title: 'Tempo de slot',
            dataIndex: 'timeSlot',
            key: 'timeSlot'
        },
    ];

    return (
        <>
            <Header />
            <Sidebar />
            <div className="main-wrapper">
                <div className="page-wrapper">
                    <div className="content container-fluid">
                        <div className="page-header">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="page-sub-header">
                                        <h3 className="page-title">Disponibilidade</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="student-group-form">
                            <div className="row">
                                <div className="col-lg-3 col-md-6">
                                    <div className="form-group">
                                    <select
                                            className="form-control"
                                            value={searchDay}
                                            onChange={(e) => setSearchDay(e.target.value)}
                                        >
                                            <option value="Monday">Monday</option>
                                            <option value="Tuesday">Tuesday</option>
                                            <option value="Wednesday">Wednesday</option>
                                            <option value="Thursday">Thursday</option>
                                            <option value="Friday">Friday</option>
                                            <option value="Saturday">Saturday</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="form-group">
                                       
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="form-group">
                                        
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                    
                                    {
    pageInfo && (
        <div className="table table-stripped table-hover datatable">
            <Table
                pagination={false}
                columns={columTable}
                dataSource={availability.sort((a, b) => (a.startTime > b.startTime) ? 1 : -1)}
                rowSelection={rowSelection}
                rowKey={(availability: Availability) => availability.id}
            />
        </div>
    )
}

                                    {
                                        pageInfo && (
                                            <ReactPaginate
                                                containerClassName={"pagination"}
                                                pageClassName={"page-item"}
                                                activeClassName={"active"}
                                                onPageChange={(event) => setPage(event.selected)}
                                                pageCount={Math.ceil(pageInfo.totalCount / PAGE_SIZE)}
                                                breakLabel="..."
                                                previousLabel={
                                                    <IconContext.Provider value={{ color: "#B8C1CC", size: "26px" }}>
                                                        <AiFillLeftCircle />
                                                    </IconContext.Provider>
                                                }
                                                nextLabel={
                                                    <IconContext.Provider value={{ color: "#B8C1CC", size: "26px" }}>
                                                        <AiFillRightCircle />
                                                    </IconContext.Provider>
                                                }
                                            />
                                        )
                                    }
                                </div>
                            </div>
                 
            <Footer />
        </>
    )
}
