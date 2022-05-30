import Header from "../mainarea/Header/Header";

 const Logout = () => {
     localStorage.localStorage.clear();
     //history.push("/Home");
    };

    function LogOut(): JSX.Element {

        // const dispatch = useDispatch();
        // dispatch(unAuthorize());
    
        // store.dispatch(LogoutAction());
        //localStorage.clear();
        //const history=useHistory();
        // useEffect(()=>{
        //     // store.dispatch(LogoutAction());
        //     notify.success("You have logged-out successfully.");
        //     // history.push('');
        // });
        return (
            <Header/>
        );
    }
    
    export default LogOut;

