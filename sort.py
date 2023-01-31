import random
import math

CA = [29,23,19,17,13,1,7,5,3,2]

def do_show():
  for index in range(0, len(CA), 10):
    numbers = CA[index: index + 10]
    for number in numbers:
      display_number = number
      if type(number) is float:
        display_number = f'{number:.2f}'
      print(f'{display_number}, ',end='')
    print('')

def do_sort():
  global CA
  CA.sort()

def do_average():
  global CA
  avg = sum(CA) / len(CA)
  print('Average: ', avg)

def do_new():
  global CA
  length = input('Input array length: ')
  length = int(length)
  if length < 1:
    return
  new_array = [random.random() * 1000 for a in range(length)]
  CA = new_array


def do_gather():
  global CA
  new_ca = []
  for number in CA:
    int_number = int(number)
    if int_number % 2 == 0:
      new_ca.append(number)
  CA = new_ca
  do_show()  

def do_biggies():
  global CA
  max_number = None

  for number in CA:
    if max_number is None:
      max_number = number
    if number > max_number:
      max_number = number

  CA = [max_number for i in range(len(CA))]

def do_reverse():
  global CA
  CA = CA.reverse()

def do_push():
  global CA
  new_element = input('Add new element in end')
  new_element = float(new_element)
  CA.append(new_element)

def do_pop():
  global CA
  if len(CA) == 0:
    print('CA empty!')
    return

  CA.pop()

def do_extremes():
  global CA  
  max_number =  None # I know i can use max() or min() function but I choose to do this insead
  min_number = None

  max_idx = None
  min_idx = None

  for idx in range(len(CA)):
    number = CA[idx]

    if max_number is None:
      max_number, min_number = number, number
      max_idx, min_idx = idx, idx
    
    if number > max_number:
      max_number = number
      max_idx = idx

    if number < min_number:
      min_number = number    
      min_idx = idx
  
  print(f'CA Array[{min_idx}] = {min_number} is the smallest element in the array;')
  print(f'CA Array[{max_idx}] = {max_number} is the largest element in the array;')

def do_median():
  global CA
  sorted_CA = sorted(CA)
  median_index =  math.floor(len(sorted_CA) / 2)
  print(f'Median element is {sorted_CA[median_index]} index of CA[{median_index}]')

def main():
  prompt_input = ''
  while prompt_input != 'quit':
    print('=====================================================', end='')
    prompt_input = input("\nEnter input\n new, print, sort, average, extremes, gather, biggies, reverse, push, pop, quit\n").lower()

    if prompt_input == 'print':
      do_show()

    elif prompt_input == 'sort':
      do_sort()

    elif prompt_input == 'new':
      do_new()

    elif prompt_input ==  'average':
      do_average()

    elif prompt_input == 'gather':
      do_gather()

    elif prompt_input == 'biggies':
      do_biggies()

    elif prompt_input == 'reverse':
      do_reverse()

    elif prompt_input == 'push':
      do_push()
    
    elif prompt_input == 'pop':
      do_pop()
    
    elif prompt_input == 'extremes':
      do_extremes()

    elif prompt_input == 'median':
      do_median()
    
    else:
      print('not a valid choice')

  pass
if __name__ == '__main__':
  main()