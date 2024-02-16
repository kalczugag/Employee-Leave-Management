import { useState } from "react";
import { useTheme, styled } from "@mui/material/styles";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableFooter,
    TablePagination,
    TableRow,
    Paper,
    IconButton,
} from "@mui/material";
import {
    FirstPage,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    LastPage,
} from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    wordBreak: "normal",
    overflowWrap: "normal",
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#e5e7eb",
        color: theme.palette.common.black,
        fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number
    ) => void;
}

const TablePaginationActions = (props: TablePaginationActionsProps) => {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
            </IconButton>
        </Box>
    );
};

interface HeaderOption {
    label: string;
    render: (row: any) => React.ReactNode;
}

interface CustomPaginationActionsTableProps {
    headerOptions: HeaderOption[];
    rowData: any[];
}

const CustomPaginationActionsTable = ({
    headerOptions,
    rowData,
}: CustomPaginationActionsTableProps) => {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowData.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        {headerOptions.map(({ label }, index) => {
                            if (index === 0) {
                                return (
                                    <StyledTableCell key={index}>
                                        {label}
                                    </StyledTableCell>
                                );
                            }

                            return (
                                <StyledTableCell align="right" key={index}>
                                    {label}
                                </StyledTableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? rowData.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                          )
                        : rowData
                    ).map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {headerOptions.map(({ render }, colIndex) => {
                                if (colIndex === 0) {
                                    return (
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            key={colIndex}
                                        >
                                            {render(row)}
                                        </TableCell>
                                    );
                                }

                                return (
                                    <TableCell key={colIndex} align="right">
                                        {render(row)}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={headerOptions.length} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[
                                5,
                                10,
                                25,
                                { label: "All", value: -1 },
                            ]}
                            colSpan={headerOptions.length + 1}
                            count={rowData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            slotProps={{
                                select: {
                                    inputProps: {
                                        "aria-label": "rows per page",
                                    },
                                    native: true,
                                },
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default CustomPaginationActionsTable;
