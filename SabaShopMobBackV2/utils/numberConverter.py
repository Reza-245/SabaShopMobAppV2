def numberConverter(barcode):
    barcode_list_per = [b for b in barcode]
    bocode_list_eng = []
    for bar in barcode_list_per:
        if ord(bar) == 1776 or ord(bar) == 48:
            bocode_list_eng.append("0")
        if ord(bar) == 1777 or ord(bar) == 49:
            bocode_list_eng.append("1")
        if ord(bar) == 1778 or ord(bar) == 50:
            bocode_list_eng.append("2")
        if ord(bar) == 1779 or ord(bar) == 51:
            bocode_list_eng.append("3")
        if ord(bar) == 1780 or ord(bar) == 52:
            bocode_list_eng.append("4")
        if ord(bar) == 1781 or ord(bar) == 53:
            bocode_list_eng.append("5")
        if ord(bar) == 1782 or ord(bar) == 54:
            bocode_list_eng.append("6")
        if ord(bar) == 1783 or ord(bar) == 55:
            bocode_list_eng.append("7")
        if ord(bar) == 1784 or ord(bar) == 56:
            bocode_list_eng.append("8")
        if ord(bar) == 1785 or ord(bar) == 57:
            bocode_list_eng.append("9")
    bocode_list_eng = "".join(bocode_list_eng)
    return bocode_list_eng


