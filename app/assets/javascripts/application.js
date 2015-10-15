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
		'" data-quality="' + idea.quality + 
		'" data-text="' + idea.title + ' ' + idea.body + '">' +
		'<h3 class="idea-title">' + idea.title + '</h3>' +
		'<p class="idea-body">' + idea.body + '</p>' +
		'<p class="idea-quality">' + displayQuality(idea.quality) + '</p>' +
		'<ul class="button-group">' + 
		'<li><button class="delete-idea-button" id="delete-idea-' + idea.id + 
		'" value="Delete This Idea">Delete This Idea</button></li>' +
		'<li><button class="downvote-idea button alert">Downvote</button><li>' +
		'<li><button class="upvote-idea button success">Upvote</button><li> ' +
		'</ul>' +
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

function upvoteIdea() {
	$('#idea-list').delegate('.upvote-idea', 'click', function() {
		var ideaToUpvote = $(this).closest('.idea');
		var newQuality = increasedQuality(parseInt(ideaToUpvote.attr('data-quality')));
		var ideaParams = {
			idea: {
				quality: newQuality
			}
		}

		$.ajax({
			type: 'patch',
			url: 'api/v1/ideas/' + ideaToUpvote.attr('data-id') + '.json',
			data: ideaParams,
			success: function() {
				ideaToUpvote.attr('data-quality', newQuality);
				ideaToUpvote.find(".idea-quality").text(displayQuality(newQuality));
			}
		})
	});
}

function increasedQuality(quality) {
	if(quality >= 2) {
		return 2;
	} else {
		return quality + 1;
	}
}

function downvoteIdea() {
	$('#idea-list').delegate('.downvote-idea', 'click', function() {
		var ideaToDownvote = $(this).closest('.idea');
		var newQuality = decreasedQuality(parseInt(ideaToDownvote.attr('data-quality')));
		var ideaParams = {
			idea: {
				quality: newQuality
			}
		}

		$.ajax({
			type: 'patch',
			url: 'api/v1/ideas/' + ideaToDownvote.attr('data-id') + '.json',
			data: ideaParams,
			success: function() {
				ideaToDownvote.attr('data-quality', newQuality);
				ideaToDownvote.find(".idea-quality").text(displayQuality(newQuality));
			}
		})
	});
}

function decreasedQuality(quality) {
	if (quality <= 0) {
		return 0;
	} else {
		return quality - 1;
	}
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