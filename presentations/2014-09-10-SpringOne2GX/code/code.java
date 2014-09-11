@EnableAutoConfiguration @ComponentScan @EnableScheduling
public class MainApp extends RepositoryRestMvcConfiguration {
	@Override
	protected void configureRepositoryRestConfiguration(
		RepositoryRestConfiguration config) {
		config.exposeIdsFor(Image.class, Garden.class, Plant.class);
		config.setBaseUri(URI.create("/api"));
	}
	public static void main(String[] args) {
		final ConfigurableApplicationContext context =
				SpringApplication.run(MainApp.class, args);
		...
	}
	@Bean
	MultipartConfigElement multipartConfigElement() { ... } ...
}