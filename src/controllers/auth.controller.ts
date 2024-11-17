

class AuthController {
    // async login(req: Request, res: Response) {
    //     // login logic
    //     const { email, password } = req.body;
    //     const user = await userService.getUserByEmailPassword(email, password);

    //     if (!user) {
    //         return res.status(401).json({ message: 'Invalid email or password' });
    //     }

        

    // }

    // async register(req: Request, res: Response) {
    //     // register logic
    // }
}
const authController = new AuthController();
export default authController;