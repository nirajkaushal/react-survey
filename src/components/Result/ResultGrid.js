import React, { PropTypes } from 'react';
import './ResultGrid.css';

class ResultGrid extends React.Component {
  isAllSelected() {
    let { rowSelects, grid: { results } } = this.props;
    return !(results.some(result => !rowSelects[result.id]));
  }

  toggleSelectAll() {
    let { onSelectAll, onUnSelectAll, grid: { results } } = this.props;
    let isAllSelected = this.isAllSelected();
    isAllSelected ? onUnSelectAll(results) : onSelectAll(results);
  }

  render() {
    let { onClickRow, onSelectRow, rowSelects, onSelectAll, onUnSelectAll } = this.props;
    let { columns, results } = this.props.grid;


    return (
        <div className="ResultGrid">
          <div className="grid-wrapper">
            <table className="table table-condensed table-hover table-bordered">
              <thead>
              <tr>
                <th className="select-box">
                  <input
                      type="checkbox"
                      onClick={e => e.stopPropagation()}
                      onChange={this.toggleSelectAll.bind(this)}
                      checked={this.isAllSelected()}
                  />
                </th>
                <th className="index">#</th>
                {columns.map(col => {
                  return <th key={col.id}>{col.displayName}</th>
                })}
              </tr>
              </thead>
              <tbody>
              {results.map((result, index) => {
                return (
                    <tr
                        key={result.id}
                        onClick={() => onClickRow(result, index)}
                    >
                      <td className="select-box">
                        <input
                            type="checkbox"
                            onClick={e => e.stopPropagation()}
                            onChange={() => onSelectRow(result.id)}
                            checked={rowSelects[result.id]}
                        />
                      </td>
                      <td className="index">{index + 1}</td>
                      {columns.map((col, index) => {
                        return <td key={index}>{result[col.columnName]}</td>
                      })}
                    </tr>
                )
              })}
              </tbody>
            </table>
          </div>
        </div>
    );
  }
}

ResultGrid.propTypes = {
  columns: PropTypes.array,
  results: PropTypes.array
};

export default ResultGrid;