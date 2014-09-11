@Controller
class ThisWillActuallyRun {
	@RequestMapping("/")
	@ResponseBody
	String home() {
		"Hello World!"
	}
}