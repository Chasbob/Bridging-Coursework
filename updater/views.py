from django.shortcuts import render

from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import git


def is_valid_signature(x_hub_signature, data, private_key):
    hash_algorithm, github_signature = x_hub_signature.split('=', 1)
    algorithm = hashlib.__dict__.get(hash_algorithm)
    encoded_key = bytes(private_key, 'latin-1')
    mac = hmac.new(encoded_key, msg=data, digestmod=algorithm)
    return hmac.compare_digest(mac.hexdigest(), github_signature)

@csrf_exempt
def index(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        if 'X-Github-Event' not in request.headers:
            return HttpResponseRedirect(f"'X-Github-Event' not in request.headers")
        if 'X-Github-Delivery' not in request.headers:
            return HttpResponseRedirect(f"'X-Github-Delivery' not in request.headers")
        if 'X-Hub-Signature' not in request.headers:
            return HttpResponseRedirect(f"'X-Github-Signature' not in request.headers")
        if not request.is_json:
            return HttpResponseRedirect(f"request not json")
        if 'User-Agent' not in request.headers:
            return HttpResponseRedirect(f"No User-Agent")
        ua = request.headers.get('User-Agent')
        if not ua.startswith('GitHub-Hookshot/'):
            return HttpResponseRedirect(f"not ua.startswith('GitHub-Hookshot/')")

        event = request.headers.get('X-GitHub-Event')
        if event == "ping":
            return json.dumps({'msg': 'Hi!'})
        if event != "push":
            return json.dumps({'msg': "Wrong event type"})

        x_hub_signature = request.headers.get('X-Hub-Signature')
        # webhook content type should be application/json for request.data to have the payload
        # request.data is empty in case of x-www-form-urlencoded
        if not is_valid_signature(x_hub_signature, request.data, w_secret):
            print('Deploy signature failed: {sig}'.format(sig=x_hub_signature))
            return HttpResponseRedirect('Deploy signature failed: {sig}'.format(sig=x_hub_signature))

        payload = request.get_json()
        if payload is None:
            print('Deploy payload is empty: {payload}'.format(
                payload=payload))
            return HttpResponseRedirect('Deploy payload is empty: {payload}'.format(payload=payload))

        if payload['ref'] != 'refs/heads/master':
            return json.dumps({'msg': 'Not master; ignoring'})

        repo = git.Repo('/home/chasbob/blog')
        origin = repo.remotes.origin

        pull_info = origin.pull()

        if len(pull_info) == 0:
            return json.dumps({'msg': "Didn't pull any information from remote!"})
        if pull_info[0].flags > 128:
            return json.dumps({'msg': "Didn't pull any information from remote!"})

        commit_hash = pull_info[0].commit.hexsha
        build_commit = f'build_commit = "{commit_hash}"'
        print(f'{build_commit}')

        return HttpResponseRedirect('Updated PythonAnywhere server to commit {commit}'.format(commit=commit_hash))

    return HttpResponseRedirect('Wrong kind of request')