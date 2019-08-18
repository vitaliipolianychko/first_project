import React, { Component } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './Button';

// eslint-disable-next-line no-unused-vars
import style from './App.css';

Enzyme.configure({ adapter: new Adapter() });

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [...Array(props.initialWidth)].map(() => shortid.generate()),
      cols: [...Array(props.initialHeight)].map(() => shortid.generate()),
      isHoverButton: false,
      isHoverTable: false,
      currentRow: 0,
      currentCol: 0,
    };
  }

  addRows = () => {
    const { rows } = this.state;
    this.setState({
      rows: [...rows, shortid.generate()],
    });
  };

  addCols = () => {
    const { cols } = this.state;
    this.setState({
      cols: [...cols, shortid.generate()],
    });
  };

  delRows = () => {
    const { rows, currentRow } = this.state;
    if (rows.length - 1 === currentRow)
      this.setState({
        currentRow: currentRow - 1,
      });
    const rowsChange = rows;
    rowsChange.splice(currentRow, 1);
    this.setState({
      rows: rowsChange,
    });
  };

  delCols = () => {
    const { cols, currentCol } = this.state;
    if (cols.length - 1 === currentCol)
      this.setState({
        currentCol: currentCol - 1,
      });
    const colsChange = cols;
    colsChange.splice(currentCol, 1);
    this.setState({
      cols: colsChange,
    });
  };

  showButtons = () => {
    this.setState({
      isHoverButton: true,
    });
  };

  hiddenButtons = () => {
    this.setState({
      isHoverButton: false,
    });
  };

  showButtonsTable = () => {
    this.setState({
      isHoverTable: true,
    });
  };

  hiddenButtonsTable = () => {
    setTimeout(
      () =>
        this.setState({
          isHoverTable: false,
        }),
      300
    );
  };

  changePosition = e => {
    if (e.target.tagName === 'TD') {
      this.setState({
        currentRow: e.target.parentNode.rowIndex,
        currentCol: e.target.cellIndex,
      });
    }
  };

  render() {
    const { isHoverButton, isHoverTable, rows, cols, currentCol, currentRow } = this.state;
    const { cellSize } = this.props;
    const isHovered = isHoverButton || isHoverTable;
    return (
      <div>
        <table
          className="table-root"
          onMouseOver={this.showButtonsTable}
          onMouseLeave={this.hiddenButtonsTable}
          onMouseMove={this.changePosition}
          onFocus
        >
          <tbody>
            {rows.map(value => (
              <tr key={value}>
                {cols.map(value1 => (
                  <td key={value1} style={{ width: cellSize, height: cellSize }}>
                    {' '}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Button styleName="button-add coll-add" onClick={this.addCols}>
          +{''}
        </Button>
        <Button styleName="button-add row-add" onClick={this.addRows}>
          +{''}
        </Button>
        {isHovered && cols.length > 1 && (
          <Button
            style={{ marginLeft: currentCol * (cellSize + 2) }}
            styleName="button-delete coll-delete"
            onClick={this.delCols}
            onMouseOver={this.showButtons}
            onMouseOut={this.hiddenButtons}
            onFocus
            onBlur
          >
            - {''}
          </Button>
        )}
        {isHovered && rows.length > 1 && (
          <Button
            style={{ marginTop: currentRow * (cellSize + 2) }}
            styleName="button-delete row-delete"
            onClick={this.delRows}
            onMouseOver={this.showButtons}
            onMouseOut={this.hiddenButtons}
            onFocus
            onBlur
          >
            - {''}
          </Button>
        )}
      </div>
    );
  }
}
Table.propTypes = {
  initialWidth: PropTypes.number,
  initialHeight: PropTypes.number,
  cellSize: PropTypes.number,
};
Table.defaultProps = {
  initialWidth: 4,
  initialHeight: 4,
  cellSize: 50,
};

export default Table;
