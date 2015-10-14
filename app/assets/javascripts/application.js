// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require foundation
//= require turbolinks
//= require_tree .

$(function(){ $(document).foundation(); });

$(document).ready(function (){
	loadAllIdeas();
	pitchIdea();
	deleteIdea();
});

function loadAllIdeas() {
	$.ajax({
		url: "api/v1/ideas.json",
		type: 'get',
		success: function (ideas){
			ideas.map(function(idea){
				displayIdea(idea);
			})
		}
	});
}

function displayIdea(idea) {
	$('#idea-list').append(
		'<li class="idea" id="idea-' + idea.id +
		'" data-id="' + idea.id +
		'" data-text="' + idea.title + ' ' + idea.body + '">' +
		'<h3>' + idea.title + '</h3>' +
		'<p>' + idea.body + '</p>' +
		'<p>' + displayQuality(idea.quality) + '</p>' +
		'<button class="delete-idea-button" id="delete-idea-' + idea.id + 
		'" value="Delete This Idea">Delete This Idea</button>' +
		'</li>'
	);
}

function pitchIdea() {
	$('#new-idea-button').on('click', function() {
		var ideaParams = {
			idea: {
				title: $('#idea_title').val(),
				body: $('#idea_body').val()
			}
		}

		$.ajax({
			type: 'post',
			url: 'api/v1/ideas.json',
			data: ideaParams,
			success: function(idea) {
				displayIdea(idea)
			}
		});
	});
}

function deleteIdea() {
	$('#idea-list').delegate('.delete-idea-button', 'click', function() {
		var ideaToDelete = $(this).closest('.idea');

		$.ajax({
			type: 'delete',
			url: 'api/v1/ideas/' + ideaToDelete.attr('data-id') + '.json',
			success: function() {
				ideaToDelete.remove();
			},
			error: function() {
				ideaToDelete.remove();
			}
		});
	});
}

function searchIdeas() {
	$('#idea_search').on('keyup', function() {
		var self = this;
		var currentSearch = self.value.toLowerCase();
		if(!currentSearch) {
			$('.idea').each(function (index, idea){
				$idea = $(idea);
				$idea.show();
			});
		} else {
			$('.idea').each(function (index, idea){
				$idea = $(idea);
				var text = $idea.getAttribute('data-text');
			});
		}
	});
}

function removeIdea(idea) {

}

function displayQuality(number) {
	if(number === 0) {
		return 'swill';
	} else if (number === 1) {
		return 'plausible';
	} else if (number === 2) {
		return 'genius';
	} else {
		return 'ERROR.';
	}
}