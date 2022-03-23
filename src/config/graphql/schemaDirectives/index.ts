// import { createRateLimitDirective } from 'graphql-rate-limit';
import AuthDirective from "./auth";
import DateFormatDirective from "./date";
import UpperCaseDirective from "./upper";
import ConcatDirective from "./concat";
import RestDirective from "./rest";
// import ValidateDirective from './validate'

export default {
  isAuthenticated: AuthDirective,
  //   rateLimit: createRateLimitDirective({
  //     identifyContext: (ctx) => (ctx.currentUser ? ctx.currentUser._id : ''),
  //   }),
  date: DateFormatDirective,
  upper: UpperCaseDirective,
  concat: ConcatDirective,
  rest: RestDirective,
  // validate: ValidateDirective
};
