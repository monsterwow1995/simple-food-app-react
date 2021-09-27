import { Fragment } from "react/cjs/react.production.min";
import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
import mealsImg from "../../assets/meals.jpg";

const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h2>ReactMeals</h2>
                <HeaderCartButton onShow={props.onShow}/>
            </header>
            <div className={classes["main-image"]}>
                <img src={mealsImg} alt="Delicious food"/>
            </div>
        </Fragment>
    );
}

export default Header;