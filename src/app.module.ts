import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { HelloWorldResolver } from './hello-world/hello-world.resolver';
import { HelloworldModule } from './helloworld/helloworld.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // debug: false,
      playground: false, //! Deprecated, use graphiql: true, or false if you use apollo studio
      graphiql: false, // For use with Apollo Studio
      plugins: [ApolloServerPluginLandingPageLocalDefault()], // Activate Apollo Studio landing page
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    HelloworldModule,
  ],
  controllers: [],
  providers: [HelloWorldResolver],
})
export class AppModule {}
