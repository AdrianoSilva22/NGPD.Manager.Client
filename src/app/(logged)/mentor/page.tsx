'use client'
import { Page } from "@/models/institution";
import { Mentor } from "@/models/mentor";
import { apiService } from "@/service/apiService/apiService";
import "@/styles/pagination.css";
import { Spin, Table, TablePaginationConfig } from "antd";
import FeatherIcon from "feather-icons-react";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";

export default function MentoresPaginition() {
    const [mentores, setMentores] = useState<Mentor[]>();
    const [pageNumber, setPage] = useState(0);
    const [pageInfo, setPageInfo] = useState<Page>();
    const [isLoading, setIsLoading] = useState(false);
    const PAGE_SIZE = 15;

    useEffect(() => {
        const getPageInfo = async () => {
            try {
                const url = `Mentor?PageNumber=${pageNumber}&pageSize=${PAGE_SIZE}&Sort=asc`
                const pageInfoResponse = await apiService.get(url);
                setPageInfo({
                    currentePage: pageInfoResponse.data.currentePage,
                    pageSize: pageInfoResponse.data.pageSize,
                    totalCount: pageInfoResponse.data.totalCount,
                    pageCount: pageInfoResponse.data.pageCount,
                    list: pageInfoResponse.data.list
                });
                setMentores(pageInfoResponse.data.list);
            } catch (error) {
                console.error(error);
            }
        };
        getPageInfo();
    }, [pageNumber]);

    const paginationConfig: TablePaginationConfig = {
        current: pageNumber + 1,
        pageSize: PAGE_SIZE,
        total: pageInfo ? Math.ceil(pageInfo.totalCount / PAGE_SIZE) : 0,
        onChange: (page, size) => {
            if (page === 1) {
                setPage(0)
            } else if (page > 1) {
                setPage(page - 1)
            }
        },
    };


    const columTable = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (mentor: Mentor) => (
                <>
                <Link href={{ pathname: '/mentor/update', query: { Id: mentor.id } }} className="btn btn-sm bg-danger-light">
                            <i>
                                <FeatherIcon icon="edit" size={18} />
                            </i>
                        </Link>
            </>
        ),
    },
];

    return (
        <>
            <div className="main-wrapper">
                <div className="page-wrapper">
                    <div className="content container-fluid">
                        <div className="page-header">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="page-sub-header">
                                        <h3 className="page-title">Mentores</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="student-group-form">
                            <div className="row">
                                <div className="col-lg-3 col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search by ID ..."
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search by Name ..."
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <div className="search-student-btn">
                                    <button type="button" className="btn btn-primary">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card card-table comman-shadow">

                                <div className="card-body">
                                    <div className="page-header">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h3 className="page-title">Mentores</h3>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        isLoading ? (
                                            <div className="loading-spinner">
                                                <Spin size="large" />
                                            </div>
                                        ) : (
                                            pageInfo && (
                                                <div className="table-responsive">
                                                    <Table
                                                        pagination={paginationConfig}
                                                        columns={columTable}
                                                        dataSource={mentores}
                                                        rowKey={(mentor: Mentor) => mentor.contact}
                                                    />
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
