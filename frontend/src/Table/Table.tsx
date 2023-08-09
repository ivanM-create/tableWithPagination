import React, { useState } from 'react';
import reportConfig from '../data/report-config.json';
import data from '../data/data.json';
import './Table.css';
import Pagination from '../Pagination/Pagination';
import ModalWindow from '../ModalWindow/ModalWindow';

type ReportColumn = {
  dataField: string;
  caption: string;
  dataType: string;
  format: string;
  alignment: string;
};

type ReportData = {
  [key: string]: string | number;
};

function Table(): JSX.Element {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [info, setInfo] = useState<ReportData | null>(null);
  const [showColumn, setShowColumn] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    reportConfig.columns.map((column) => column.dataField)
  );
  const [columnNames, setColumnNames] = useState<Record<string, string>>(
    reportConfig.columns.reduce((acc, column) => {
      acc[column.dataField] = column.caption;
      return acc;
    }, {} as Record<string, string>)
  );
  const [editingColumn, setEditingColumn] = useState<string | null>(null);
  const [tempColumnNames, setTempColumnNames] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  const toggleColumnVisibility = (dataField: string): void => {
    if (visibleColumns.includes(dataField)) {
      setVisibleColumns(visibleColumns.filter((column) => column !== dataField));
      setShowColumn(true);
    } else {
      setVisibleColumns([...visibleColumns, dataField]);
    }
  };

  const handleColumnNameChange = (dataField: string, newName: string): void => {
    setTempColumnNames((prevColumnNames) => ({
      ...prevColumnNames,
      [dataField]: newName,
    }));
  };

  const startEditingColumn = (dataField: string): void => {
    setEditingColumn(dataField);
    setTempColumnNames({
      ...tempColumnNames,
      [dataField]: columnNames[dataField],
    });
  };

  const stopEditingColumn = (): void => {
    setEditingColumn(null);
  };

  const saveColumnNameChange = (dataField: string): void => {
    setColumnNames((prevColumnNames) => ({
      ...prevColumnNames,
      [dataField]: tempColumnNames[dataField],
    }));
    stopEditingColumn();
  };

  const showAllColumns = (): void => {
    setVisibleColumns(reportConfig.columns.map((column) => column.dataField));
    setShowColumn(false);
  };

  const openModal = (item: ReportData): void => {
    setInfo(item);
    setModalIsOpen(true);
  };

  const closeModal = (): void => {
    setModalIsOpen(false);
  };

  const itemsPerPage = 20;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="tableContainer">
      <ModalWindow modalIsOpen={modalIsOpen} closeModal={closeModal} info={info} />
      <div className="buttonsContainer">
        {showColumn ? (
          <button className='showColumnsBtn' type="button" onClick={showAllColumns}>
            Показать скрытые колонки
          </button>
        ) : null}
      </div>
      <table className="table">
        <thead>
          <tr>
            {reportConfig.columns.map((column: ReportColumn, index: number) => {
              if (visibleColumns.includes(column.dataField)) {
                return (
                  <th key={index}>
                    {editingColumn === column.dataField ? (
                      <>
                        <input
                          type="text"
                          value={tempColumnNames[column.dataField]}
                          onChange={(event) =>
                            handleColumnNameChange(column.dataField, event.target.value)
                          }
                        />
                        <button
                          type="button"
                          onClick={() => saveColumnNameChange(column.dataField)}
                        >
                          Сохранить
                        </button>
                        <button type="button" onClick={stopEditingColumn}>
                          Отмена
                        </button>
                      </>
                    ) : (
                      <>
                        <span>{columnNames[column.dataField]}</span>
                        <button
                          className="editBtn"
                          type="button"
                          onClick={() => startEditingColumn(column.dataField)}
                        >
                          <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em">
                            <path d="M12.854.146a.5.5 0 00-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 000-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 016 13.5V13h-.5a.5.5 0 01-.5-.5V12h-.5a.5.5 0 01-.5-.5V11h-.5a.5.5 0 01-.5-.5V10h-.5a.499.499 0 01-.175-.032l-.179.178a.5.5 0 00-.11.168l-2 5a.5.5 0 00.65.65l5-2a.5.5 0 00.168-.11l.178-.178z" />
                          </svg>
                        </button>
                      </>
                    )}
                    <button className="visibleBtn" type="button" onClick={() => toggleColumnVisibility(column.dataField)}>
                      <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
                        <path d="M8.073 12.194L4.212 8.333c-1.52 1.657-2.096 3.317-2.106 3.351L2 12l.105.316C2.127 12.383 4.421 19 12.054 19c.929 0 1.775-.102 2.552-.273l-2.746-2.746a3.987 3.987 0 01-3.787-3.787zM12.054 5c-1.855 0-3.375.404-4.642.998L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.298-3.298c2.638-1.953 3.579-4.637 3.593-4.679l.105-.316-.105-.316C21.98 11.617 19.687 5 12.054 5zm1.906 7.546c.187-.677.028-1.439-.492-1.96s-1.283-.679-1.96-.492L10 8.586A3.955 3.955 0 0112.054 8c2.206 0 4 1.794 4 4a3.94 3.94 0 01-.587 2.053l-1.507-1.507z" />
                      </svg>
                    </button>
                  </th>
                );
              }
              return null;
            })}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row: ReportData, rowIndex: number) => (
            <tr key={rowIndex}>
              {reportConfig.columns.map((column: ReportColumn, columnIndex: number) => {
                if (visibleColumns.includes(column.dataField)) {
                  return (
                    <td key={columnIndex} onClick={() => openModal(row)}>
                      {row[column.dataField]}
                    </td>
                  );
                }
                return null;
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Table;
