import { useState, useEffect } from 'react';
import FormList from './FormList';

const Form = () => {
  const [date, setDate] = useState(new Date());
  const [worldClocks, setWorldClocks] = useState([
    { name: "Moscow", timezone: 3 },
    { name: "London", timezone: 0 },
    { name: "New York", timezone: -5 }
  ]);
  const [form, setForm] = useState({
    name: "",
    timezone: 0,
  })

  useEffect(() => {
    const clock = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => clearTimeout(clock)
  }, [date]);

  const handleAddTime = (event) => {
    event.preventDefault();
    if (form.timezone > 12 || form.timezone < -12) {
      console.log('Error in timezone');
      return
    }

    const newClock = { name: form.name, timezone: form.timezone };
    setWorldClocks(prevWorldClocks => [...prevWorldClocks, newClock]);
    setForm({ name: "", timezone: 0 });
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const handleRemove = (clock) => {
    console.log(clock);
    setWorldClocks(prevWorldClocks => prevWorldClocks.filter(o => o.name !== clock))
  }


  return (
    <>
      <form onSubmit={handleAddTime}>
        <div>
          <label forhtml="name">Название</label>
          <input type="text" id="name" name="name" value={form.name} onChange={handleFormChange} required />
        </div>
        <div>
          <label forhtml="timezone">Временная зона</label>
          <input type="number" id="timezone" name="timezone" value={form.timezone} onChange={handleFormChange} min="-12" max="12" required />
        </div>
        <button>Добавить</button>
      </form>
      <ul>
        <FormList 
          worldClocks={worldClocks} 
          date={date} 
          handleRemove={handleRemove}/>
      </ul>
    </>
  )
}

export default Form;