import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
export const installSwagger=app=>{const spec=swaggerJSDoc({definition:{openapi:'3.0.3',info:{title:'Gestor de Finanzas Personales',version:'1.0.0'},servers:[{url:'http://localhost:3000/api/v1'}],components:{securitySchemes:{bearerAuth:{type:'http',scheme:'bearer',bearerFormat:'JWT'}}}},apis:['./src/presentation/routes/*.js']});app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(spec));};
