using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ErrorsController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails { Title = "Bad request" });
        }

        [HttpGet("unathorized")]
        public ActionResult GetUnauthorized()
        {
            return Unauthorized();
        }

        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("ValidationError1", "Validation error 1");
            ModelState.AddModelError("ValidationError2", "Validation error 2");
            return ValidationProblem();
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("Server error");
        }
    }
}