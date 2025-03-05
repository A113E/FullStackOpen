// Pruebas de Extremo a Extremo para la aplicación de Blogs_List
// Importamos test (pruebas), expect (verificar elementos), beforeEach (hook que se ejecuta antes de cada prueba) y describe(bloques de prueba)
const {test, expect, beforeEach, describe} = require('@playwright/test')

// Importa loginWith y createBlog desde test_helper
const {loginWith, createBlog} = require('./test_helper')

// Bloque de pruebas para Blog App
describe('Blog App', () => {
    // Hook que se ejecuta antes de cada prueba
    beforeEach(async ({ page, request }) => {
        // Hacemos una solicitud al enrutador del backend testingRouter para resetear la base de datos antes de cada prueba
        await request.post('http:localhost:3003/api/testing/reset')
        // Hacemos una solicitud al enrutador del backend users para crear un nuevo usuario antes de cada prueba
        await request.post('http://localhost:3003/api/users', {
             // Creamos un nuevo usuario para las pruebas
             data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }
        })
        // Obtiene la baseUrl 
        await page.goto('http://localhost:5173')
    })

    // Primera prueba: verifica que la aplicación muestra el formulario de inicio de sesión por defecto.
    test('Login Form is shown', async ({ page }) => {
        //Encuentra y hace clic en el botón con el texto "Log-in"
        await page.getByRole('button', { name: 'Log-in'}).click()

        // Encuentra el campo de entrada del usuario mediante su atributo "data-testid" y verifica si está visible
        await expect(page.getByTestId('username')).toBeVisible()

        // Encuentra el campo de entrada de la contraseña mediante su atributo "data-testid" y verifica si está visible
       await expect(page.getByTestId('password')).toBeVisible()

        // Enceuntra el botón de logearse con el texto "Login" y verifica si está visible
        await expect(page.getByRole('button', { name: 'Login'})).toBeVisible() 
    })

    // Bloque de pruebas para Login
    describe('Login', () => {
        // Segunda prueba: verifica que el usuario inicia sesión exitosamente
        test('succeeds with correct credentials', async ({ page }) => {
            // Logea al usuario con la función auxiliar loginWith usando un usuario y contraseña verificado
            await loginWith(page, 'mluukkai', 'salainen')

            // Verifica que el texto 'Matti Luukkainen logged in' sea visible en la pantalla después de iniciar sesión
            await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
        })

        // Tercera prueba: verifica que el usuario no inicie sesión si las credenciales son incorrectas
        test('fails with wrong credentials', async ({ page }) => {
            // Logea al usuario con la función auxiliar loginWith usando un usuario y contraseña incorrecta
            await loginWith(page, 'mluukkai', 'wrong')

            // Asegura que el mensaje de error se muestre en el elemento que contiene el className error
            const errorDiv = await page.locator('.error') // La prueba utiliza el método page.locator para encontrar el componente que contiene la clase CSS error y lo almacena en una variable.

            // Verifica que la aplicación muestre un mensaje de error
            await expect(errorDiv).toContainText('Invalid username or password. Please try again.')

            // Probar los estilos CSS de la aplicación con el comparador toHaveCSS
            // Verifica que el mensaje de error tenga un borde solido
            await expect(errorDiv).toHaveCSS('border-style', 'solid')
            // Verifica que el color del mensaje de error sea rojo
            await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

            // Verifica que la aplicación no muestre el texto 'Matti Luukkainen logged in'
            await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
        })

        // Bloque de pruebas para cuando el usuario está logeado "when logged in"
        describe('When logged in', () => {
            // Hook que se ejecuta antes de las pruebas
            beforeEach(async ({ page }) => {
                // Logea al usuario con la función auxiliar loginWith usando un usuario y contraseña verificado
                await loginWith(page, 'mluukkai', 'salainen')
            })

            // Cuarta prueba: verifica que se pueda añadir un nuevo blog
            test('a new blog can be created', async ({ page }) => {
                // Creamos un nuevo blog usando la función auxiliar createBlog
                await createBlog(page, 'A test Blog for Playwright', 'Administrador', 'https://www.test.playwright')

                // Busca dentro de la lista de blogs el blog recién creado usando un locator
                const blogListSummary = page.locator('.blog-summary')
                const blogListDetails = page.locator('.blog-details')

                // Verificamos que existe ese nuevo titulo
                await expect(blogListSummary.getByText('A test Blog for Playwright')).toBeVisible()
                await expect(blogListSummary.getByText('Administrador')).toBeVisible()
                
                // Encuentra y hace clic en el botón con el texto "View"
                await page.getByRole('button', {name: 'View'}).click()
                await expect(blogListDetails.getByText('https://www.test.playwright')).toBeVisible()
            })
            
            // Bloque de pruebas para editar Blogs
            describe('Edit Blogs', () => {
              // Hooke que se ejecuta antes de cada prueba
              beforeEach(async ({ page }) => {
                // Crea un nuevo blog con la función auxiliar
                await createBlog(page, 'Blog for edit', 'Admin1', 'https://www.blog.1')
              })


             // Quinta prueba: verifica que se puede dar un like a un blog 
             test('like a blog', async ({ page }) => {
                // Verifica que el blog creado esté visible
                // Esperar a que la UI refleje la actualización
                const blogListSummary = page.locator('.blog-summary')
                const blogListDetails = page.locator('.blog-details')

                await expect(blogListSummary.getByText('Blog for edit')).toBeVisible()
                await expect(blogListSummary.getByText('Admin1')).toBeVisible()

                // Encuentra y hace clic en el botón "View" para mostrar los detalles del blog
                await page.getByRole('button', { name: 'View' }).click()

                await expect(blogListDetails.getByText('https://www.blog.1')).toBeVisible()

                // Encuentra y hace clic en el botón con el texto Like
                await page.getByRole('button', { name: 'Like'}).click()

                // Verifica si el like está visible
                await expect(blogListDetails.getByText('1')).toBeVisible()
             })

            // Sexta prueba: verifica que un blog se puede editar     
            test('a blog can be edited', async ({ page }) => {
                 // Encuentra y hace clic en el botón "View" para mostrar los detalles del blog
                 await page.getByRole('button', { name: 'View' }).click()
             
                 // Crear un nuevo blog con el mismo título
                 await page.getByRole('button', { name: 'new blog' }).click()
                 await page.getByTestId('title').fill('Blog for edit')
                 await page.getByTestId('author').fill('Admin2')
                 await page.getByTestId('url').fill('https://www.test2')
             
                 // Capturar el diálogo y aceptarlo automáticamente
                 page.on('dialog', async dialog => {
                     expect(dialog.message()).toContain('The blog "Blog for edit" already exists. Do you want to replace it?')
                     await dialog.accept()
                 })
             
                 // Hacer clic en "Add" para disparar la alerta
                 await page.getByRole('button', { name: 'Add' }).click()
             
                 // Esperar a que la UI refleje la actualización
                 const blogListSummary = page.locator('.blog-summary')
                 const blogListDetails = page.locator('.blog-details')
             
                 await expect(blogListSummary.getByText('Blog for edit')).toBeVisible()
                 await expect(blogListSummary.getByText('Admin2')).toBeVisible()
                 await expect(blogListDetails.getByText('https://www.test2')).toBeVisible()
             })

            })
            
             // Bloque de pruebas para eliminar blogs
describe('Delete Blogs', () => {
    // Hook que se ejecuta antes de cada prueba
    beforeEach(async ({ page }) => {
        await createBlog(page, 'Blog to delete', 'Alberto Gonzalez', 'https://www.test.dl')
    })

    // Séptima prueba: verificar que solo el creador vea el botón de eliminar
    test('only blog creator can see delete button', async ({ page }) => {
        // Verifica que el texto 'Matti Luukkainen logged in' sea visible en la pantalla después de iniciar sesión
        await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()

        // Verifica que el blog creado esté visible
        const blogListSummary = page.locator('.blog-summary')

        await expect(blogListSummary.getByText('Blog to delete')).toBeVisible()
        await expect(blogListSummary.getByText('Alberto Gonzalez')).toBeVisible()

         // Esperar para asegurarse de que la UI se actualice
         await page.waitForTimeout(15000) 
         
        // Muestra los detalles del blog
        await page.getByRole('button', { name: 'View' }).click()

        // Verifica que el botón "Delete" sea visible para el creador
        await expect(page.getByRole('button', { name: 'Delete Blog' })).toBeVisible()
    })

    // Octava prueba: verifica que un blog se pueda eliminar 
    test('a blog can be deleted', async ({ page }) => {
         // Verificar que el blog se haya creado correctamente
    const blogListSummary = page.locator('.blog-summary');
    await expect(blogListSummary.getByText('Blog to be deleted')).toBeVisible()
    await expect(blogListSummary.getByText('Matti Luukkainen')).toBeVisible()

    // Mostrar detalles del blog
    await page.getByRole('button', { name: 'View' }).click()

    const blogListDetails = page.locator('.blog-details')

    // Verificar que el botón "Delete Blog" sea visible para el creador
    const deleteButton = blogListDetails.getByRole('button', { name: 'Delete Blog' })
    await expect(deleteButton).toBeVisible();

    // Capturar y aceptar el diálogo de confirmación
    page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Are you sure you want to delete Blog to Delete?')
        await dialog.accept()
    })

    // Hacer clic en el botón "Delete"
    await deleteButton.click()

    // Verificar que el blog ya no esté visible en la lista
    await expect(page.getByText('Blog to be deleted')).not.toBeVisible()
    })
})

// Bloque de prueba: ordenar los blogs
describe('Ordered blogs', () => {
    // Hook que se ejecuta antes de cada prueba
    beforeEach(async ({ page }) => {
        // Crear 3 blogs diferentes
        await createBlog(page, 'Blog with 1 like', 'Author1', 'https://test1.com')
  await createBlog(page, 'Blog with 3 likes', 'Author2', 'https://test2.com')
  await createBlog(page, 'Blog with 2 likes', 'Author3', 'https://test3.com')
    })
    // Novena prueba:  Ordnerar los blogs por likes
    test('blogs are ordered by likes in descending order', async ({ page }) => {
        // Localiza los blogs por un className
        const blogs = page.locator('.blog')

        // Da likes a los blogs
        await page.getByRole('button', { name: 'View' }).nth(0).click()
       await page.getByRole('button', { name: 'Like' }).nth(0).click() // 1 like

        await page.getByRole('button', { name: 'View' }).nth(1).click()
       await page.getByRole('button', { name: 'Like' }).nth(1).click()
       await page.getByRole('button', { name: 'Like' }).nth(1).click() // 2 likes

        await page.getByRole('button', { name: 'View' }).nth(2).click()
        await page.getByRole('button', { name: 'Like' }).nth(2).click()
        await page.getByRole('button', { name: 'Like' }).nth(2).click() 
        await page.getByRole('button', { name: 'Like' }).nth(2).click() // 3 likes

        // Obtener los títulos de los blogs en el orden actual de la UI
    const titles = await Promise.all(
    blogs.locator('.blog-summary').allTextContents()
  )
   // Comprobamos que el blog con 3 likes esté primero, luego 2 likes y al final 1 like
   expect(titles[0]).toContain('Blog with 3 likes')
   expect(titles[1]).toContain('Blog with 2 likes')
   expect(titles[2]).toContain('Blog with 1 like')
    })
})
        })
    })
})

