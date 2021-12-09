import requests

r =  requests.get('https://192.168.2.69/PSIA/Metadata/stream', verify=False, auth=('qwerty', 'shah2021'), stream=True)
print(r.status_code, 'status_code')
for line in r.iter_lines():

    # filter out keep-alive new lines
    if line:
        decoded_line = line.decode('utf-8')

        if '<?xml' in decoded_line:
            print(decoded_line)
            print('\n')