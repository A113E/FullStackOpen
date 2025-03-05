// Funciones auxiliares para manejar las pruebas

// Función para iniciar sesión
const loginWith = async (page, username, password) => {
    // Encuentra y hace clic en el botón con el texto "Log-in"
    await page.getByRole('button', { name: 'Log-in'}).click()

    // Encuentra el campo de entrada del usuario mediante su atributo "data-testid" y llena el campo con el username insertado
    await page.getByTestId('username').fill(username)

    // Encuentra el campo de entrada de la contraseña mediante su atributo "data-testid" y llena el campo con el password insertado
    await page.getByTestId('password').fill(password)

    // Encuentra y hace clic en el botón de logearse "Login"
    await page.getByRole('button', { name: 'Login'}).click()
}

// Función para crear nuevo blog
const createBlog = async (page, title, author, url) => {
    // Encuentra y hace clic en el botón con el texto "new blog"
    await page.getByRole('button', { name: 'new blog'}).click()

    // Busca el campo title por getByTestId y lo llena con el title
    await page.getByTestId('title').fill(title)

    // Busca el campo author por getByTestId y lo llena con el author
    await page.getByTestId('author').fill(author)

    // Busca el campo url por getByTestId y lo llena con el url
    await page.getByTestId('url').fill(url)

    // Busca y hace clic en el botón con el texto "Add" para agregar el blog
    await page.getByRole('button', { name: 'Add'}).click()
}
// Exporta las funciones
export {loginWith, createBlog}