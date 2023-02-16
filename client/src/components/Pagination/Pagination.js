import React, {useEffect, useState} from 'react';
import { Pagination, PaginationItem } from '@mui/material';

import useStyles from './styles';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getBooksBySearch} from '../../actions/books';

/*function useQuery() {
	return new URLSearchParams(useLocation().search);
}*/

const Paginate = () => {
	const classes = useStyles();
	const location = useLocation();
	const [url, setUrl] = useState(location.search);
	const [page, setPage] = useState("1");
	const {numberOfPages} = useSelector((state) => state.books);

	useEffect(()  => {
		const query = new URLSearchParams(location.search);
		const search = query.get("searchQuery") || '';
		const subject = query.get("subject") || '';
		const author = query.get("author") || '';
		setPage(query.get("page"));

		setUrl(`/books/search?${search ? 'searchQuery='+search : ''}${subject ? '&subject='+subject : ''}${author ? '&author='+author : ''}&page=`);
	}, [location.search]);

	return (
		<Pagination
			classes={{ul: classes.ul}}
			count={numberOfPages}
			page={Number(page)}
			color="primary"
			renderItem={(item) => (
				<PaginationItem {...item} component={Link} to={`${url}${item.page}`}/>
			)}
		/>
	);
};

export default Paginate;