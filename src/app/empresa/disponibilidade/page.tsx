'use client'
import { globalStateAtomId, institutionClassIdAtom } from "@/atoms/atoms";
import Sidebar from "@/components/Sidebar/SideBar";
import { Page } from "@/models/institution";
import "@/styles/pagination.css";
import { Table } from "antd";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import Header, { default as Footer } from '../../../components/Header/Header';

import { apiService } from "@/service/apiService/apiService";
import { useTranslation } from 'react-i18next';
import { useSearchParams } from "next/navigation";
import { Availability } from "@/models/Availability";

export default function AvailabilityPagination() {
    const [availability, setAvailabilitys] = useState<Availability[]>([]);
    const [pageIndex, setPage] = useState(0);
    const [pageInfo, setPageInfo] = useState<Page | null>(null);
    const [searchDay, setSearchDay] = useState<string>("Selecione um dia da semana");
    const [] = useAtom(globalStateAtomId);
    const PAGE_SIZE = 25;
    const { t } = useTranslation();
    const searchParams = useSearchParams();

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: Availability[]) => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
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
                setAvailabilitys(response.data.listAvailability);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };
        getPageInfo();
    }, [pageIndex, searchDay]);

    const handleUpdate = async () => {
        const selectedData = availability.filter(item => selectedRowKeys.includes(item.id));
        const empresaId = searchParams.get('Id') as string;

        const body = {
            totalCount: selectedData.length,
            totalPages: 1, // Ajuste conforme necessário
            pageSize: selectedData.length, // Ajuste conforme necessário
            currentPage: 1, // Ajuste conforme necessário
            listAvailability: selectedData
        };

        try {
            const url = `http://localhost:5293/api/v1/Empresa/AtualizarDisponibilidades?empresaId=${empresaId}`;
            const response = await apiService.put(url, body);
            if (response.status === 200) {
                console.log("Update successful");
            } else {
                console.error("Update failed", response.statusText);
            }
        } catch (error) {
            console.error("Update error", error);
        }
    };

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
                                            <option value="Segunda-feira">Segunda-feira</option>
                                            <option value="Terça-feira">Terça-feira</option>
                                            <option value="Quarta-feira">Quarta-feira</option>
                                            <option value="Quinta-feira">Quinta-feira</option>
                                            <option value="Sexta-feira">Sexta-feira</option>
                                            <option value="Sábado">Sábado</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="button-wrapper">
                            <button className="btn btn-primary" onClick={handleUpdate}>Update Selected</button>
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
            </div>
            <Footer />
        </>
    )
}