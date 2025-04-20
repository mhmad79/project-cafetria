export default function FormPhone({ addressProps = {}, setAddressProp, disabled = false }) {
    const { phone = '' } = addressProps;
  
    return (
      <>
        <label>Phone</label>
        <input 
          disabled={disabled}
          type='tel' 
          placeholder="Phone number"
          value={phone} 
          onChange={ev => setAddressProp('phone', ev.target.value)}
        />
      </>
    );
  }
  