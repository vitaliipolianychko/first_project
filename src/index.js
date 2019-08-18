import React from 'react';
import ReactDOM from 'react-dom';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Table from './App';

Enzyme.configure({ adapter: new Adapter() });

const Element = () => {
  return (
    <div className="root-container">
      <Table initialHeight={5} initialWidth={5} cellSize={50} />
    </div>
  );
};

ReactDOM.render(<Element />, document.getElementById('root'));
