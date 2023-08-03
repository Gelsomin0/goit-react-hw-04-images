import { FallingLines } from 'react-loader-spinner';
import css from './FallingLinesComponent.module.css';

export const FallingLinesComponent = () => {
    return (
        <div className={css.loader}>
            <FallingLines
                color="#4fa94d"
                width="100"
                visible={true}
                ariaLabel='falling-lines-loading'
            />
        </div>
        
    );
}