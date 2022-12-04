import Moment from 'react-moment';
import moment from 'moment-timezone';

const FormList = ({ worldClocks, date, handleRemove }) => {
  moment.tz.setDefault("Europe/London");
  Moment.globalMoment = moment;

  return (
    <>
      {worldClocks.map(clock => {
        return (
          <li key={clock.name.toString()}>
            <div>{clock.name}</div>
            <Moment date={date} add={{ hours: clock.timezone }} format="HH:mm:ss" />
            <button
              className='remove-clock'
              onClick={() => handleRemove(clock.name)}>X</button>
          </li>
        )
      })}
    </>
  )
}

export default FormList;