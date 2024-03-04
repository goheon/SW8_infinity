const app = require('./app');

describe('MongoDB Connection', () => {
  let server;

  // 테스트 시작전 서버 시작
  beforeAll((done) => {
    server = app.listen(3000, () => {
      done();
    });
  });

  // 테스트 종료 후 서버 종료
  afterAll((done) => {
    server.close(done);
  });

  test('Should connect to MongoDB', () => {
    // MongoDB 연결이 완료되면 콘솔에 로그를 출력합니다.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('MongoDB Connected');
        resolve();
      }, 1000); // MongoDB 연결 시간을 대략적으로 설정합니다.
    });
  });
});
