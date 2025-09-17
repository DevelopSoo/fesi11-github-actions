// 테스트를 실행하기 전에 먼저 실행할 놈들을 여기다 모아놓는다.
import "@testing-library/jest-dom";
import { server } from "./src/mocks/server";

// 모든 테스트 시작 전에 1번 실행할 코드 -> MSW 서버를 실행한다.
beforeAll(() => server.listen());
// 각 테스트가 끝난 후 기존의 데이터를 원래대로 복구할 것이다.
afterEach(() => server.resetHandlers());
// 서버를 끈다.
afterAll(() => server.close());
