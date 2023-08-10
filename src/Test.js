
/* 컴포넌트 */
function Test() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <div
        style={{
          height: '9vh',
          width: '100%',
        }}
      ></div>
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 9vh)',
          display: 'flex',
          flexFlow: 'row nowrap',
          gap: '0',
        }}
      >
        <div
          style={{
            width: '33.3%',
            height: '100%',
          }}
        ></div>
        <div
          style={{
            width: '33.3%',
            height: 'auto',
            overflow: 'auto',
          }}
        ></div>
        <div
          style={{
            width: '33.3%',
            height: '100%',
          }}
        ></div>
      </div>
    </div>
  );
}


export default Test;

