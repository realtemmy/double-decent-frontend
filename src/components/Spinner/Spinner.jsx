import './Spinner.css'

const Spinner = () => {
  return (
    <div className='w-screen top-0 h-screen absolute z-10'  style={{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        position: 'fixed',

    }}>
      <div className="spinner"></div>
    </div>
  );
}

export default Spinner
