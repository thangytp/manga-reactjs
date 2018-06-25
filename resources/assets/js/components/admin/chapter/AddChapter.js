import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

import cheerio from 'cheerio';
import queryString from 'query-string';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Breadcrumb from '../_shared/Breadcrumb';
import Helper from '../_shared/Helper';

export default class AddChapter extends Component {
	constructor(props){
		super(props);
		this.state = {source: 'mangak', chap: '', name: '', slug: '', status: '', content: '', mangas: [], manga: '' };
		this.handleChangeSource = this.handleChangeSource.bind(this);
		this.handleChangeManga = this.handleChangeManga.bind(this);
		this.handleChangeChap = this.handleChangeChap.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeSlug = this.handleChangeSlug.bind(this);
		this.handleChangeStatus = this.handleChangeStatus.bind(this);
		this.handleChangeContentURL = this.handleChangeContentURL.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.alertSuccess = this.alertSuccess.bind(this);
		this.alertError = this.alertError.bind(this);
	}

	componentDidMount(){
		document.title = 'Add Chapter';

		let query = queryString.parse(this.props.location.search);
		this.setState({manga: query.manga});

		axios.get('/mangas').then((response) => {
			console.log(response);
			if(response.data.code === 200){
				this.setState({mangas: response.data.data});
			} else {
				this.alertError({title: 'Error', text: response.data.message});
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	alertSuccess (payload) {
	    this.container.success(
	      	payload.text,
	      	payload.title, {
	      	timeOut: 5000,
	      	extendedTimeOut: 3000
	    });
  	}
  	alertError (payload) {
	    this.container.error(
	      	payload.text,
	      	payload.title, {
	      	timeOut: 5000,
	      	extendedTimeOut: 3000
	    });
  	}

  	handleChangeSource(e) {
  		this.setState({
  			source: e.target.value.trim()
  		});
  	}

  	handleChangeManga(selectedManga) {
  		console.log(selectedManga);
  		let name = selectedManga.label + ' chap ' + this.state.chap.trim();
  		this.setState({
  			manga: selectedManga,
  			name: name
  		});

  		let slug = Helper.changeToSlug(name);
  		console.log(slug);
  		this.setState({
  			slug: slug
  		});
  	}

  	handleChangeChap(e){
		this.setState({
			chap: e.target.value.trim()
		})
	}
	handleChangeName(e){
		this.setState({
			name: e.target.value.trim()
		});
		let slug = Helper.changeToSlug(e.target.value.trim());
  		this.setState({
  			slug: slug
  		});
	}
	handleChangeSlug(e){
		this.setState({
			slug: e.target.value.trim()
		})
	}
	
	handleChangeStatus(e){
		this.setState({
			status: e.target.value.trim()
		})
	}
	handleChangeContentURL(e){
		let source = this.state.source;
		var pageToVisit = e.target.value.trim();
		console.log("Visiting page " + pageToVisit);

		let contentLoad = '';
		let name = '';
		fetch(pageToVisit)
	  	.then((resp) => resp.text()) // Transform the data into json
	  	.then(function(data) {
		    console.log(data);
		    var $ = cheerio.load(data);
		    if(source === 'mangak'){
			    contentLoad = $('.vung_doc').html(); 
			    contentLoad = contentLoad.replace(/Mangak.info/g, 'Manga');
			    console.log(contentLoad);
			    name = $('.entry-title').text();
			}
			if(source === 'comicvn'){
				contentLoad = $('#image-load').html();
				console.log(contentLoad);
			    name = $('.entry-title').text();
			}
			return {contentLoad: contentLoad, name: name};

	   	}).then((data)=>{

	   		let chap = data.name.split(' ');
	   		chap = chap[chap.length-1];

	   		let slug = Helper.changeToSlug(data.name);
	   		
	    	this.setState({
	    		content: data.contentLoad, name: data.name, chap: chap, slug: slug
	    	});
	    	console.log(this.state.content);
	   	});
		 
	}

	handleSubmit(e){
		e.preventDefault();
		const chapter = {
			manga_id: this.state.manga.value ? this.state.manga.value : parseInt(this.state.manga),
			chap: this.state.chap,
			name: this.state.name,
			slug: this.state.slug,
			status: this.state.status,
			content: this.state.content
		}
		console.log(chapter);
		let uri = '/chapters';
		axios.post(uri, chapter).then((response) => {
			console.log(response);
			if(response.data.code === 200){
				this.alertSuccess({title: 'Success', text: response.data.message});
			} else {
				this.alertError({title: 'Error', text: response.data.message});
			}
			// browserHistory.push('/display-item');
		});
	}

	changeToSlug(name)
	{
	    let slug;
	 
	    slug = name.toLowerCase();
	 
	    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
	    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
	    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
	    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
	    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
	    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
	    slug = slug.replace(/đ/gi, 'd');
	    
	    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');

	    slug = slug.replace(/ /gi, "-");

	    slug = slug.replace(/\-\-\-\-\-/gi, '-');
	    slug = slug.replace(/\-\-\-\-/gi, '-');
	    slug = slug.replace(/\-\-\-/gi, '-');
	    slug = slug.replace(/\-\-/gi, '-');
	    
	    slug = '@' + slug + '@';
	    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
	    
	    return slug;
	}
	
	render(){
		let mangas = <option value="">No data</option>;
		if(this.state.mangas){
			mangas = this.state.mangas.map((manga, i) => {
				return (
					<option value={manga.id} key={i}>{manga.name}</option>
				);
			});
		}

		let selectMangas = [];
		if(this.state.mangas){
			this.state.mangas.map((manga, i) => {
				selectMangas.push({value: manga.id, label: manga.name});
			});
		}

		return (
				<div>
					<Breadcrumb activePage="Add chapter" />
					<div className="card">
						<div className="card-body">
							<form onSubmit={this.handleSubmit}>
								<div className="form-group row">
									<label htmlFor="chap" className="col-sm-2 col-form-label">Source</label>
									<div className="col-sm-10">								
										<select className="form-control" id="source" onChange={this.handleChangeSource} value={this.state.source}>
											<option value="mangak">MangaK</option>
											<option value="comicvn">Comicvn</option>
										</select>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Content URL</label>
									<div className="col-sm-10">
										<input className="form-control" id="content-url" onChange={this.handleChangeContentURL} />
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="chap" className="col-sm-2 col-form-label">Manga</label>
									<div className="col-sm-10">								
										{/*<select className="form-control selectpicker" id="manga" onChange={this.handleChangeManga} value={this.state.manga}>
											{mangas}
										</select>*/}
										<Select
											id="manga"
									        name="manga"
									        value={this.state.manga}
									        onChange={this.handleChangeManga}
									        options={selectMangas}
									        clearable={false}
									      />
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="chap" className="col-sm-2 col-form-label">Chap</label>
									<div className="col-sm-10">
										<input type="text" className="form-control" id="chap" placeholder="" value={this.state.chap} onChange={this.handleChangeChap}/>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
									<div className="col-sm-10">
										<input type="text" className="form-control" id="name" placeholder="Thiên Vương Chi Nộ" onChange={this.handleChangeName} value={this.state.name}/>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Slug</label>
									<div className="col-sm-10">
										<input type="text" className="form-control" id="slug" placeholder="/tay-du-chap-1" value={this.state.slug} onChange={this.handleChangeSlug}/>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Status</label>
									<div className="col-sm-10">
										<input type="text" className="form-control" id="status" placeholder="New, Cam, Raw" onChange={this.handleChangeStatus}/>
									</div>
								</div>
								
								<div className="form-group row">
									<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Content</label>
									<div className="col-sm-10">
										<textarea className="form-control" id="content-chapter" onChange={this.handleChangeContent} value={this.state.content}></textarea>
									</div>
								</div>
								<div className="form-group row">
									<div className="col-sm-10">
										<button className="btn btn-info">Add</button>
									</div>
								</div>
							</form>

							<div className="row" dangerouslySetInnerHTML={{ __html: this.state.content }}>
							</div>
						</div>
					</div>

					<ToastContainer ref={(input) => {this.container = input;}}
                        toastMessageFactory={ToastMessageFactory}
                        className="toast-top-right"
                        preventDuplicates={true} />
				</div>
			)
	}
}