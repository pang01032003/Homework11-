const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)

function Counter({ item: { id, number }, hdlUpdate, hdlRemove }) {
  return (
    <div className='counter'>
      <button onClick={() => hdlUpdate(id, -1)}> - </button>
      <h3>{number}</h3>
      <button onClick={() => hdlUpdate(id, 1)}> + </button>
      <button onClick={() => hdlUpdate(id, -number)}> C </button>
      <button onClick={() => hdlRemove(id)}> X </button>
    </div>
  );
}

function SumInfo(props) {
  const {sum, hdlAddCounter } = props;

  return (
    <div className='suminfo'>
      <h1>Sum = {sum}</h1>
      <button className='text-center' onClick={hdlAddCounter}>Add Counter</button>
    </div>
  );
}

function App() {
  const [counters, setCounters] = React.useState([{ id: 1, number: 0 }]);

  const hdlUpdate = (id, num) => {
    const cloneCounters = [...counters];
    const idx = cloneCounters.findIndex((el) => el.id === id);

    if (cloneCounters[idx].number + num < 0) {
      return;
    }

    cloneCounters[idx].number += num;
    setCounters(cloneCounters);
  };

  const hdlAddCounter = () => {
    const newId = counters.length === 0 ? 1 : counters[counters.length - 1].id + 1;
    const cloneCounters = [...counters];
    cloneCounters.push({ id: newId, number: 0 });
    setCounters(cloneCounters);
  };

  const hdlRemoveCounter = (id) => {
    const updatedCounters = counters.filter((counter) => counter.id !== id);
    setCounters(updatedCounters);
  };

  const sum = counters.reduce((acc, curr) => acc + curr.number, 0);

  return (
    <>
      <SumInfo color="red" size="big" sum={sum} hdlAddCounter={hdlAddCounter} />
      {counters.map((el) => (
        <div key={el.id}>
          <Counter item={el} hdlUpdate={hdlUpdate} hdlRemove={hdlRemoveCounter} />
        </div>
      ))}
    </>
  );
}