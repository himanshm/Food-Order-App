type ErrorProps = {
  title: string;
  message: string;
};

function Error({ title, message }: ErrorProps) {
  return (
    <div className='error-boundary'>
      <div className='error'>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Error;
