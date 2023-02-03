import React, { FC } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  onChangePage: any;
};
const Pagination: FC<PaginationProps> = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      previousLabel="<"
    />
  );
};
export default Pagination;
