import { postsHandlers } from "./handlers/posts";
import { setupServer } from "msw/node";

// MSW 서버를 설정합니다. (세팅합니다)
export const server = setupServer(...postsHandlers);
