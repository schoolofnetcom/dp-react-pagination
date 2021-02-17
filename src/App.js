import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

function App() {
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [curPage, setCurPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [curData, setCurData] = useState([]);
  const [items, setItems] = useState([]);

  const fetchTodos = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await res.json();
    setItems(data); //items
    const slicedData = data.slice(offset, offset + perPage);
    setPageCount(Math.ceil(data.length / perPage));
    const curData = slicedData.map(i => <> <p key={i.id}>{i.title}</p>  </>)
    setCurData(curData);
  }

  const handlePageClick = (event) => {
    const { selected } = event;
    const offset = selected * perPage;
    setCurPage(selected);
    setOffset(offset);
    fetchTodos();
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  
  return(
    <div>
      {curData}
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default App;
